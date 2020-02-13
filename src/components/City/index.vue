<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading"></Loading>
            <Scroller v-else ref="city_list">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul  class="clearfix">
                            <li v-for="item in this.hotList" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="(item, index) in this.cityList" :key="index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="item in item.list" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{item.nm}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item, index) in this.cityList" :key="index" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "City",
        data(){
            return{
                hotList: [],
                cityList: [],
                isLoading: true
            }
        },
        mounted() {
            var cityList = window.localStorage.getItem('cityList');
            var hotList = window.localStorage.getItem('hotList');
            if (cityList && hotList){
                this.isLoading = false;
                this.cityList = JSON.parse(cityList);
                this.hotList = JSON.parse(hotList);
            }else {
                //{id: id, nm: nm}
                this.axios.get('/api/cityList').then((res)=>{
                    var data = res.data;
                    if(data.msg === 'ok'){
                        this.isLoading = false;
                        var cities = data.data.cities;
                        this.hotList = this.getHotCities(cities);
                        this.cityList = this.formatCityList(cities);
                        window.localStorage.setItem('hotList',JSON.stringify(this.hotList));
                        window.localStorage.setItem('cityList',JSON.stringify(this.cityList));
                    }

                });
            }
        },
        methods: {
            formatCityList(cities){
                var cityList = [];//[{index: x, list: [{id: id, nm:nm}]}]
                function isTrue(a){
                    // console.log(a);
                    // console.log(cityList)
                    for(var k = 0; k<cityList.length; k++){
                        // console.log(cityList[k].index);
                        if(cityList[k].index == a){
                            return true;
                        }
                    }
                    return false;
                }
                for(var i = 0; i<cities.length; i++){
                    var index = cities[i].py.substring(0,1).toUpperCase();
                    if(isTrue(index)){
                        for(var j=0; j<cityList.length; j++){
                            if(cityList[j].index === index){
                                // console.log(cityList);
                                cityList[j].list.push({id:cities[i].id, nm: cities[i].nm})
                            }
                        }
                    }else {
                        cityList.push({index: index, list:[{id:cities[i].id, nm: cities[i].nm}]})

                    }
                    // console.log(cityList)
                }

                cityList.sort((n1,n2)=>{
                    if(n1.index>n2.index){
                        return 1;
                    }else if(n1.index < n2.index){
                        return -1;
                    }else {
                        return 0;
                    }
                });
                console.log(cityList)
                return cityList;
            },
            getHotCities(cities){
                var hotList = [];
                for(var i = 0; i < cities.length; i++ ){
                    if(cities[i].isHot === 1){
                        hotList.push({id: cities[i].id, nm: cities[i].nm});
                    }
                }
                return hotList;
            },
            handleToIndex(index){
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                console.log(index);
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
                // this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
                this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
            },
            handleToCity(nm, id){
                this.$store.commit('city/CITY_INFO',{ nm , id });
                window.localStorage.setItem('nowNm', nm);
                window.localStorage.setItem('nowId', id);
                this.$router.push('/movie/nowPlaying');
            }
        }
    }
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>
