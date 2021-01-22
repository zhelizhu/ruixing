<template>
  <div class="login">
    <!-- 底部导航 -->

    <navbar></navbar>

    <!-- 登录 -->

    <!-- 欢迎登录 -->

    <div class="welcome">
      <van-cell-group>
        <!-- 标题 -->

        <van-cell label="please login to your accounts">
          <!-- 内容 -->

          <template #title>
            <span class="custom-title">欢迎回来</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 登录表单 -->

    <van-form>
      <van-field
        v-model="userLoginInfo.phoneNumber"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="userLoginInfo.password"
        :type="isToggleType ? 'text' : 'password'"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        :right-icon="isToggleType ? 'eye-o' : 'closed-eye'"
        @click-right-icon="togglePassword"
      />

      <div class="forget">
        <van-cell value="忘记密码" />
      </div>

      <div style="margin: 16px" background="#232773" @click="loginEvent">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>

    <div class="registed-btn" @click="showPopup = true">
      <van-cell value="注册" />
    </div>

    <!-- 注册弹出层 -->

    <van-popup v-model="showPopup" closeable position="bottom">
      <div class="register">
        <!-- 注册欢迎 -->

        <div class="welcome">
          <van-cell-group>
            <van-cell label="Welcome to register">
              <template #title>
                <span class="custom-title">欢迎注册</span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>

        <!-- 注册表单 -->

        <van-form>
          <!-- 手机号 -->

          <van-field
            v-model="userRegisterInfo.userRegisterPhone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          >
          </van-field>

          <!-- 密码 -->

          <van-field
            v-model="userRegisterInfo.userRegisterPass"
            :type="isToggleType ? 'text' : 'password'"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            :right-icon="isToggleType ? 'eye-o' : 'closed-eye'"
            @click-right-icon="togglePassword"
          />

          <!-- 昵称 -->

          <van-field
            v-model="userRegisterInfo.userRegisterNickName"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          >
          </van-field>

          <!-- 注册按钮 -->

          <div style="margin: 16px" @click="registerEvent" background="#232773">
            <van-button round block type="info" native-type="submit"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import "../../assets/style/login.less";

import navbar from "../../components/NavBar";

import { utils } from "../../assets/js/utils";

export default {
  name: "Login",

  data() {
    return {
      // 用户登录信息

      userLoginInfo: {
        phoneNumber: "",

        password: "",
      },

      // 用户注册信息

      userRegisterInfo: {

        userRegisterPhone: "",

        userRegisterPass: "",

        userRegisterNickName: "",
      },

      // 弹出层控制

      showPopup: false,

      // 密码眼睛控制toggle

      isToggleType: false,
    };
  },

  // 方法

  methods: {
    // 控制眼睛

    togglePassword () {
      this.isToggleType = !this.isToggleType;
    },

    // 注册事件

    registerEvent () {

      let registerObj = {
        // 手机号码正则

        phone: {
          value: this.userRegisterInfo.userRegisterPhone,

          reg: /^1[3-9]\d{9}$/,

          errMsg: "手机号码格式不正确",
        },

        // 密码正则

        password: {

          value: this.userRegisterInfo.userRegisterPass,

          reg: /^[A-Za-z]\w{5,15}$/,

          errMsg: "密码格式不正确(密码支持字母数字_组合首字符必须为字母)",
        },

        // 昵称正则

        nickName: {
          
          value: this.userRegisterInfo.userRegisterNickName,

          reg: /^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/,

          errMsg: "昵称支持汉字字母数字组合",
        },
      };

      if (!utils.validForm( registerObj )) {

        return 

      }

      this.$toast.loading({

        message: '加载中',

        forbidClick: true,

        // 0不能关闭
        duration: 0

      })

      this.axios({
        
        method: 'POST',

        url:'/register',

        // post:需要挂载到data

        data:{

          appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",

          nickName: this.userRegisterInfo.userRegisterNickName,

          password: this.userRegisterInfo.userRegisterPass,

          phone: this.userRegisterInfo.userRegisterPhone

        }

      }).then((res) => {
        
        if(res.data.code === 100) {

          this.showPopup = false

          this.$toast.clear()

          this.$toast({

          message: res.data.msg,

          position: 'bottom',

          }) 

          for (const key in this.userRegisterInfo) {
            
            this.userRegisterInfo[key] = ''

          }

        }
        else{

          this.$toast({

          message: `${res.data.msg}`,

          position: 'bottom',

          // 禁止点击背景

          forbidClick :true

          })  

        }

      }).catch(() => {

          this.$toast.clear()
        
          this.$toast({

          message: '服务器忙！',

          position: 'bottom',

          // 禁止点击背景

          forbidClick :true

          }) 

      });

    },

    // 注册事件

    loginEvent () {
      
      let loginObj = {
        // 手机号码正则

        phone: {
          value: this.userLoginInfo.phoneNumber,

          reg: /^1[3-9]\d{9}$/,

          errMsg: "手机号码格式不正确",
        },

        // 密码正则

        password: {

          value: this.userLoginInfo.password,

          reg: /^[A-Za-z]\w{5,15}$/,

          errMsg: "密码格式不正确(密码支持字母数字_组合首字符必须为字母)",
        }

      }

      if (!utils.validForm( loginObj )) {

        return 

      }

      this.$toast.loading({

        message: '登录中',

        forbidClick: true,

        // 0不能关闭
        duration: 0

      })

        this.axios({
        
        method: 'POST',

        url:'/login',

        // post:需要挂载到data

        data:{

          appkey: this.appKey,

          password: this.userLoginInfo.password,

          phone: this.userLoginInfo.phoneNumber

        }

      }).then((res) => {
        
        if(res.data.code === 200) {

          this.showPopup = false

          this.$toast.clear()

          this.$toast({

          message: res.data.msg,

          position: 'bottom',

          }) 

          for (const key in this.userLoginInfo) {
            
            this.userLoginInfo[key] = ''

          }

          // 本地存储

          // localStorage.setItem('userToken',res.data.token)

          // cookies

          
          this.$cookie.set('userToken', res.data.token, 1)


          this.$router.push('/')


        }
        else{

          this.$toast({

          message: `${res.data.msg}`,

          position: 'bottom',

          // 禁止点击背景

          forbidClick :true

          })  

        }

      }).catch(() => {

          this.$toast.clear()
        
          this.$toast({

          message: '服务器忙！',

          position: 'bottom',

          // 禁止点击背景

          forbidClick :true

          }) 

      });
    }

  },

  components: {
    navbar,
  },
};
</script>
