<template>
    <div class="card">
        <div class="title">
            <span class="category"><i></i>APP</span>
            <span class="title-info">莴笋种植技术：教你该如何种植出又大又好的莴笋</span>
        </div>
        <div class="content">
            <img src="http://www.baishujun.com/wp-content/themes/yusi1.0/timthumb.php?src=http://www.baishujun.com/wp-content/themes/yusi1.0/img/pic/6.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
            <div  class="summary">
                <span>
                    买种子就上农科百蔬，农科百蔬APP一直在紧张的编写过程中，最近也已经完工，目前已经在应用宝、华为市场、小米市场、oppo市场，豌豆荚、PP助手、安智市场等一系列较为火爆的APP应用市场上线，有兴趣的朋友欢迎下载，https://www.nkbaishu.com/down/inde...
                </span>
                <p class="ins">
                    <span><i class="iconfont icon-iconfontgerenzhongxin"></i>白淑君</span>
                    <span><i class="iconfont icon-shijian"></i>七天前</span>
                    <span><i class="iconfont icon-iconset0207"></i>62°C</span>
                    <span><i class="iconfont icon-weibiaoti-"></i>1评论</span>
                    <span><i class="iconfont icon-icon-test"></i>0喜欢</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .card{
        width: 730px;
        padding: 20px;
        background-color: #fff;
        .title{
            display: flex;
            margin-bottom: 15px;
        }
        .category{
            position: relative;
            display: block;
            text-align: center;
            width: 40px;
            height: 20px;
            color: #fff;
            background-color: #d9534f;
            i{
                position: absolute;
                right: -4px;
                top: 50%;
                transform: translateY(-50%);
                border-left: 4px solid #d9534f;
                border-top: 4px solid transparent;
                border-bottom: 4px solid transparent;
            }
        }
        .title-info{
            margin-left: 5px;
            font-size: 20px;
            color: #00a67c;
        }
        .content{
            display: flex;
            img{
                margin-right: 20px;
            }
            .summary{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .ins{
                align-self: flex-end;
                span{
                    color: #999;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
