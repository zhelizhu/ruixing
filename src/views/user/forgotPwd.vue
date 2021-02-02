<template>
  <div class="forgot-pws">
    <navbar></navbar>
    <div class="register">
      <!-- 注册欢迎 -->

      <div class="welcome">
        <van-cell-group>
          <van-cell label="find back the password">
            <template #title>
              <span class="custom-title">找回密码</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 注册表单 -->

      <van-form validate-trigger="onSubmit">
        <!-- 手机号 -->

        <van-field
          v-model="backPasswordInfo.email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        >
        </van-field>

        <!-- 验证码 -->

        <van-field
          v-model="backPasswordInfo.code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true}]"
        >
        </van-field>

        <button ref="sendCode" class="send-code" @click="sendCode">发送验证码</button>

        <div class="forget">
          <van-cell value="已有账号，立即登录" to="/login" />
        </div>

        <!-- 注册按钮 -->

        <div style="margin: 16px" @click="backPassword" background="#232773">
          <van-button round block type="info" native-type="submit"
            >下一步</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import navbar from "../../components/NavBar";

export default {
  data() {
    return {
      // 用户注册信息

      backPasswordInfo: {
        email: "",

        code: "",
      },
    };
  },

  components: {
    navbar,
  },

  methods: {
    backPassword() {

        this.axios({

           method:'POST',

           url: '/checkValidCode',

           data: {
               
               appkey:this.appKey,

               validCode: this.backPasswordInfo.code
           }


       })
       .then((res)=>{


           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === "K001"){

             this.$router.push('/requestPwd')

           }

       })

    },
    sendCode() {

        if(this.backPasswordInfo.email.length === 0 ){

            this.$toast({

                message: '请填写邮箱'

            })

            return

        }
        this.axios({

           method:'POST',

           url: '/emailValidCode',

           data: {
               
               appkey:this.appKey,

               email: this.backPasswordInfo.email
           }


       })
       .then((res)=>{


           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === "J001"){

            this.$toast({

                message: res.data.msg

            })

            let btn = this.$refs.sendCode

            btn.disabled=true

            btn.color="#ccc"

            let s = 60

            let timer=setInterval(()=>{

                s--

                if(s!==0){

                    btn.innerHTML=s--+'后重试'

                }
                else{

                    clearInterval(timer)

                    btn.innerHTML='获取验证码'

                }

            },1000)

           }

       })


    }
  },
};
</script>

<style lang="less" scoped>

/deep/ .van-form{

    position: relative;

}

/deep/ .custom-title {
  font-size: 35px;
  color: #333;
}

/deep/ .van-button {
  margin-top: 150px;
  background: #232773;
}

/deep/ .van-form {
  /deep/ .van-cell {
    padding: 25px;
  }
}

.welcome {
  margin-top: 100px;

  /deep/ .van-cell {
    border: none;
  }
}

.forget {
  /deep/ .van-cell__value {
    text-align: right;
    color: #232773;
  }
}

.registed-btn {
  /deep/ .van-cell__value {
    text-align: center;
    color: #232773;
  }
}

.send-code {
  position: absolute;

  bottom: 285px;

  right: 15px;

  z-index: 2;

  background: #232773;

  color: #fff;

  padding:8px;

  border-radius: 25px;

  font-size:5px;

}
</style>