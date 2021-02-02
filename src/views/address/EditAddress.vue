<template>
  <div class="add-address">

     <van-nav-bar
      class="add-address-nav-bar"
      :title="aid?'编辑地址':'添加地址'"
      :show-delete="aid"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />


    <div class="in-add-address">

    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="!!aid"
      show-set-default
      show-search-result
      detail-maxlength="30"
      @save="saveAddress"
      @delete="deleteAddress"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="originEditAddress"
    />
    </div>
  </div>
</template>

<script>

import areaList from '../../assets/js/area'

export default {

    data() {

        return {

            aid:'',

            areaList,

            originEditAddress:{}

        }

    },

    methods:{

        onClickLeft() {

            this.$router.push('/address')

        },

        // 新增

        addAddress(val) {

            let uesrToken = this.$cookie.get('userToken')

            let data = {

                ...val,

                tokenString:uesrToken,

                appkey:this.appKey,

            }

            data.isDefault = Number(val.isDefault)

            delete data.country
            
            this.axios({

                method:'POST',

                url: '/addAddress',

                data: data

            })
            .then((res)=>{

                if(res.data.code === 700) {

                    this.$router.push('/login')

                    return
                
                }

                if(res.data.code === 9000) {

                    this.$toast({

                        message: '添加地址成功！'

                    })

                    this.$router.push('/address')

                }

            })



        },

        editAddress(val){

            let isEdit = null

            for (const key in this.originEditAddress) {

                if (this.originEditAddress[key] !== val[key]) {
                    
                    isEdit = true

                    break
                    
                }
            }

            if(isEdit){

                // 编辑

                let address = {}

                address.aid = this.aid

                address.name = val.name

                address.tel = val.tel

                address.province = val.province

                address.city = val.city

                address.county = val.county

                address.addressDetail = val.addressDetail

                address.areaCode = val.areaCode

                address.areaCode = val.areaCode

                address.postalCode = val.postalCode

                address.isDefault = Number(val.isDefault)

                let uesrToken = this.$cookie.get('userToken')

                this.$toast.loading({
                    message: '修改中...'
                })

                this.axios({

                    method:'POST',

                    url: '/editAddress',

                    data: {

                       appkey: this.appKey,

                       tokenString:uesrToken,

                       ...address

                    }

                })
                .then((res)=>{


                    if(res.data.code === 700) {

                        this.$router.push('/login')

                        return
                    
                    }

                    if(res.data.code === 30000) {

                        this.$toast.clear()
                        
                        this.$toast({
                            message: '修改成功！'
                        })

                    }

                })

                }
                else{

                    this.$router.push('/address')

                }

        },

        saveAddress(val) {

            if(this.aid){

                //编辑

                this.editAddress(val)

            }
            else{

                this.addAddress(val)

            }

        },

        // 编辑

        getAddressData(){

            let uesrToken = this.$cookie.get('userToken')
            
            if(!this.aid){

                return

            }

            this.axios({

                method:'GET',

                url: '/findAddressByAid',

                params: {

                   appkey: this.appKey,

                   tokenString:uesrToken,

                   aid:this.aid,

                }

            })
            .then((res)=>{


                if(res.data.code === 700) {

                    this.$router.push('/login')

                    return
                
                }

                if(res.data.code === 40000) {

                    let data = res.data.result[0]

                    data.isDefault = !! data.isDefault

                    this.originEditAddress = data

                }

            })



        },

        // 删除

        deleteAddress() {

            let uesrToken = this.$cookie.get('userToken')
            
            if(!this.aid){

                return

            }

            this.axios({

                method:'POST',

                url: '/deleteAddress',

                data: {

                   appkey: this.appKey,

                   tokenString:uesrToken,

                   aid:this.aid,

                }

            })
            .then((res)=>{


                if(res.data.code === 700) {

                    this.$router.push('/login')

                    return
                
                }

                if(res.data.code === 10000) {

                    this.$toast({
                        message:res.data.msg
                    })

                    this.$router.push('/address')

                }

            })

        }


    },

    created(){

        this.aid=this.$route.params.aid

        if (this.aid) {
            
            this.getAddressData()
         
        }

    }   

};
</script>

<style lang="less" scoped>

.add-address{

    background: #f7f7f7;

    height: 100vh;

    .in-add-address{

        padding: 8px;

        /deep/ .van-cell{

            padding: 15px;

        }

        /deep/ .van-switch--on{

            background: #232773;

        }

        /deep/ .van-button--danger{

            background: #232773;

            border-color: #232773;

        }

        /deep/ .van-dialog__confirm{

            color: #232773;

        }

        // /deep/ .van-button::before{

        //     color: #232773;

        // }

    }

}

</style>