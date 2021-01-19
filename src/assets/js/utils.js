import { Toast } from 'vant';

// 工具库
class Utils {

    // 验证表单

    validForm(obj) {

        for (const key in obj) {

            if (!obj[key].reg.test(obj[key].value)) {
                
                Toast({

                    message: obj[key].errMsg,

                    position: 'bottom',

                    duration: 3000,

                    // 禁止点击背景

                    forbidClick :true

                  });

                return false

            }
        }

        return true

    }

}

export const utils = new Utils()