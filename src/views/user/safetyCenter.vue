<template>
  <div class="safety-center">
      <van-nav-bar

      class="cart-nav-bar"

      title="安全中心"

      left-text="返回"

      left-arrow
      
      @click-left="onClickLeft"

    />
    <bluecard>
      <van-cell title="修改密码" @click="editPassword" is-link />
      <div class="edit-password">
        <van-popup v-model="isEditPassword" position="bottom">
          <van-cell class="edit-password-title" title="修改密码">
            <span @click="exitEditPassword">取消</span>
          </van-cell>
          <van-form @submit="onSubmit" validate-trigger="onSubmit">
            <van-field
              v-model="editData.password"
              type="password"
              name="原密码"
              label="原密码"
              placeholder="原密码"
              :rules="[{ required: true, message: '请填写原密码' }]"
            />
            <van-field
              v-model="editData.editpassword_1"
              type="password"
              name="新密码"
              label="新密码"
              placeholder="新密码"
              :rules="[{ required: true, message: '请填写新密码' }]"
            />
            <div class="edit-btn">
              <van-button round block type="info" native-type="submit"
                >确认修改</van-button
              >
            </div>
          </van-form>
        </van-popup>
      </div>
      <van-cell title="退出登录" @click="logout" is-link />
    </bluecard>
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";

import bluecard from "../../components/BlueTopCard";

export default {
  data() {
    return {
      // 是否显示修改密码弹框
      isEditPassword: false,

      // 修改密码数据
      editData: {
        // 原密码
        password: "",
        // 第一次输入密码
        editpassword_1: "",
      },
    };
  },

  components: {
    bluecard,
  },

  methods: {
    onClickLeft() {

      this.$router.go(-1);

    },
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          title: "退出登录",
          confirmButtonColor: "#232773",
        })
        .then(() => {
          this.$cookie.set("userToken", "", 1);
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
    // 显示修改密码弹框
    editPassword() {
      this.isEditPassword = true;
    },
    // 确认修改密码
    onSubmit() {
      const editPassObj = {
        // 密码正则

        password: {
          value: this.editData.editpassword_1,

          reg: /^[A-Za-z]\w{5,15}$/,

          errMsg: "密码格式不正确(首字符必须为字母,5位到15位！)",
        },
      };
      // 调用工具库表单验证方法验证
      if (!utils.validForm(editPassObj)) {
        return;
      }

      let uesrToken = this.$cookie.get("userToken");

      this.axios({
        method: "POST",

        url: "/updatePassword",

        data: {
          appkey: this.appKey,

          tokenString: uesrToken,

          password: this.editData.editpassword_1,

          oldPassword: this.editData.password,
        },
      }).then((res) => {

        if (res.data.code === 700) {
          this.$router.push("/login");

          return;
        }

        if (res.data.code === "E001") {
          this.isEditPassword = false;

          for (const key in this.editData) {
            this.editData[key] = "";
          }
        } else {
          this.$toast({
            message: res.data.msg,
          });
        }
      });
    },
    // 取消修改密码
    exitEditPassword() {
      this.isEditPassword = false;
      for (const key in this.editData) {
        this.editData[key] = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.safety-center {
  height: 100vh;
}

/deep/ .van-button {
  background: #232773;
}
</style>