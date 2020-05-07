<template>
    <el-main class="item-wrapper"> 
        <div class="top-btns">
            <a href="javascript:;" class="top-btn" :class="{ active: !isSavedList }" @click="isSavedList = false">Current</a>
            | 
            <a href="javascript:;" class="top-btn" :class="{ active: isSavedList }" @click="isSavedList = true">Saved</a>
        </div>
        <div class="items" v-show="!isSavedList">
            <h3>Current Articles</h3>
              <p style="text-align:center" v-show="!isLoading && !articles.length">No Articles Found</p>
             <el-table v-show="articles.length > 0" :data="articles" stripe border>
                <el-table-column prop="index" label="#" width="40">
                </el-table-column>
                <el-table-column prop="title" label="Title">
                </el-table-column>
                <el-table-column label="Link">
                    <template slot-scope="scope">
                        <a target="_blank" v-bind:href="scope.row.link">
                            {{ scope.row.link }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column label="Saved" width="75">
                    <template slot-scope="scope">
                        <label class="star-container">
                            <input type="checkbox" :data-index="scope.row.index" v-model="scope.row.saved" style="display:none" @click="toggleSave"/>
                            <span class="star el-icon-star-on" :class="{ on: scope.row.saved }" />
                        </label>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="items" v-show="isSavedList">
            <h3>Saved Articles</h3>
              <p style="text-align:center" v-show="!saved.length">No Articles Saved</p>
             <el-table v-show="saved.length > 0" :data="saved" stripe border>
                <el-table-column prop="index" label="#" width="40">
                </el-table-column>
                <el-table-column prop="title" label="Title">
                </el-table-column>
                <el-table-column label="Link">
                    <template slot-scope="scope">
                        <a target="_blank" v-bind:href="scope.row.link">
                            {{ scope.row.link }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column label="Unsave" width="75">
                    <template slot-scope="scope">
                        <label class="star-container">
                            <input type="checkbox" :data-index="scope.row.index" style="display:none" @click="forceDelete"/>
                            <span class="xout"/>
                        </label>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <p style="text-align:right" v-show="!isSavedList">Feed courtesy of <a href="http://newsapi.org" target="_blank">NewsApi.org</a></p>
    </el-main>
</template>
<script>
import variables from '../../variables.js';
import NewsApi from 'newsapi';
import Api from '../api';
import { mapGetters } from 'vuex';
const api = new Api();

export default {
    data: () => {
        return {
            variables: variables, 
            newsApi: new NewsApi(variables.NEWSAPI_KEY),
            isLoading: true,
            isSavedList: false
        }
    },
    computed: mapGetters({
        articles: 'newsfeed',
        saved: 'savedfeed'
    }),
    beforeMount: function() {
        this.isLoading = true;
        let loading = this.$loading();
        let $this = this;
        api.get('/articles', {}, saved => {
            $this.$store.dispatch('saved', saved.data);
            $this.newsApi.v2.topHeadlines({
                language: 'en',
                country:'us'
            }).then(response => {
                $this.$store.dispatch('get', response.articles);
                $this.isLoading = false;
                loading.close();
                setInterval(() => {
                    this.newsApi.v2.topHeadlines({
                        language: 'en',
                        country:'us'
                    }).then(response => {
                        $this.$store.dispatch('get', response.articles);                       
                        $this.isLoading = false;
                    }).catch(error => {
                        console.log(error)
                    });
                }, 300000);
            });
        });
    },
    methods: {
        toggleSave(e){
            let ind = e.target.dataset.index;
            let i = Number(ind) - 1;
            this.articles[i].saved = !this.articles[i].saved;
            if (this.articles[i].saved) { 
                this.saveArticle(this.articles[i].title, i);
            } else {
                this.deleteArticle(this.articles[i].title, i);
            }             
        },
        forceDelete(e) {
            let ind = e.target.dataset.index;
            let i = Number(ind) - 1;
            let $this = this;
            api.delete('/articles', { id: this.saved[i].id }, function(res) {
                $this.$message({
                    type: res.status,
                    message: res.message,
                    showClose:true,
                    duration:1500
                });
                $this.$store.dispatch('remove', res.id);    
            });
        },
        saveArticle(title, i) {
            let $this = this;
            api.post('/articles', {
                id: this.articles[i].savedId,
                article: title,
                link: this.articles[i].link
            }, function(res) {
                $this.$message({
                    type: res.status,
                    message: res.message,
                    showClose: true,
                    duration:1500
                });
                $this.$store.dispatch('save', {
                    id: res.id,
                    title: title,
                    link: $this.articles[i].link
                }); 
            });
        },
        deleteArticle(title, i) {
           let $this = this;
            api.delete('/articles', { id: this.articles[i].savedId }, function(res) {
                $this.$message({
                    type: res.status,
                    message: res.message,
                    showClose:true,
                    duration:1500
                });
                $this.$store.dispatch('remove', res.id);    
            });
        },
    }
}
</script>