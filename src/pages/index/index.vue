<template>
  <div class="page">
    <div class="wrapper">
      <div class="step">
        <div class="step__item">
          <div class="step__top step__top--light">
            <span class="myicon-tick"></span>
          </div>
          <div class="step__label">待处理</div>
        </div>
        <div class="step__item">
          <div class="step__top step__top--light">
            <span class="myicon-tick"></span>
          </div>
          <div class="step__label">正在处理</div>
        </div>
        <div class="step__item">
          <div class="step__top step__top--light">
            <span class="myicon-tick"></span>
          </div>
          <div class="step__label">已派发</div>
        </div>
        <div class="step__item">
          <div class="step__top step__top--light">
            <span class="myicon-tick"></span>
          </div>
          <div class="step__label">待支付</div>
        </div>
        <div class="step__item">
          <div class="step__top">
            <span class="myicon-tick"></span>
          </div>
          <div class="step__label">待评价</div>
        </div>
        <div class="step__item">
          <div class="step__top">
            <span class="myicon-tick"></span>
          </div>
          <div class="step__label">已完成</div>
        </div>
        <div class="step__line step__line--dark"></div>
        <div class="step__line step__line--light" style="width: 45%"></div>
      </div>
    </div>

    <div class="wrapper">
      <div class="detail__title">
        <mu-icon value="description"></mu-icon>
        订单详情
      </div>
      <div class="detail__container">
        <div class="detail__item">
          <span class="detail__label">订单编号：</span>
          <span class="detail__con">{{con.order}}</span>
        </div>
        <div class="detail__item">
          <span class="detail__label">报修房产：</span>
          <span class="detail__con">{{con.house_id}}</span>
        </div>
         <div class="detail__item">
          <span class="detail__label">报修类型：</span>
          <span class="detail__con">{{con.type}}</span>
        </div>
        <div class="detail__item">
          <span class="detail__label">报修时间：</span>
          <span class="detail__con">{{con.order_create_time}}</span>
        </div>
         <div class="detail__item">
          <span class="detail__label">预订时间：</span>
          <span class="detail__con">{{con.sub_time}}</span>
        </div>
         <div class="detail__item">
          <span class="detail__label">订单总价：</span>
          <span class="detail__con">{{con.total}}</span>
        </div>
         <div class="detail__item">
          <span class="detail__label">维修师傅：</span>
          <span class="detail__con">{{con.repair_employee_name}}</span>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="detail__title">
        <mu-icon value="face"></mu-icon>
        客户信息
      </div>
      <div class="detail__container">
        <div class="detail__item">
          <span class="detail__label">联系人：</span>
          <span class="detail__con">{{con.user_name}}</span>
        </div>
        <div class="detail__item">
          <span class="detail__label">联系方式：</span>
          <span class="detail__con">{{con.user_mobile}}</span>
        </div>
      </div>
    </div>

    <div class="wrapper" style="margin-bottom:0">
      <div class="detail__title">
        <mu-icon value="build"></mu-icon>
        报修详情
      </div>
      <div class="detail__container">
        <div class="detail__item">
          <span class="detail__label">报修备注：</span>
          <span class="detail__con">{{con.remark}}</span>
        </div>
        <div class="detail__item">
          <span class="detail__label">报修图片：</span>
          <span class="detail__con">
            <img class="detail__img" src="http://101.132.106.165/apache/imgLibrary/img/3.jpg" width="200" height="200" />
          </span>
        </div>
      </div>
      <mu-flex justify-content="center" align-items="center">
        <mu-button full-width :disabled="submitDisabled" v-show="submitLable"
          color="primary" @click="handleSubmit">{{submitLable}}</mu-button>
      </mu-flex>
    </div>

    <!-- <mu-dialog fullscreen scrollable :open.sync="dialogMark" style="background-color:#000;">
      <img class="dialog__img" src="http://101.132.106.165/apache/imgLibrary/img/3.jpg"
        width="100%" :height="con.img_height"
        @click="() => { this.dialogMark = false }"/>
    </mu-dialog> -->
  </div>
</template>

<script>
import detail from './detail'
export default {
  name: "app",
  data () {
    return {
      con: {},
      dialogMark: false,
      role: 1,
      submitLable: '',
      submitDisabled: false
    }
  },
  methods: {
    handleSubmit() {
      console.log('1')
    }
  },
  created() {
    this.con = detail.data.obj
    if(this.role === 1) {    // 用户
      switch(this.con.flow) {
        case 0:
          this.submitLable = '取消订单'
          break
        case 1:
          this.submitDisabled = true
          this.submitLable = '正在受理中'
          break
        case 2:
          this.submitDisabled = true
          this.submitLable = '正在受理中'
          break
        case 3:
          this.submitLable = '订单已取消'
          break
        case 4:
          this.submitLable = '立即支付'
          break
        case 5:
          this.submitLable = '立即评价'
          break
        case 6:
          this.submitDisabled = true
          this.submitLable = '已完成'
          break
      }
    }else {             // 工程师
      switch(this.con.flow) {
        case 0:
          this.submitLable = ''
          break
        case 1:
          this.submitLable = ''
          break
        case 2:
          this.submitLable = '填写总价'
          break
        case 3:
          this.submitLable = ''
          break
        case 4:
          this.submitDisabled = true
          this.submitLable = '待支付'
          break
        case 5:
          this.submitDisabled = true
          this.submitLable = '待评价'
          break
        case 6:
          this.submitDisabled = true
          this.submitLable = '已完成'
          break
      }
    }
  }
};
</script>

<!-- 当页样式 -->
<style lang="less" scoped>
.step {
  position: relative;
  width: 100%;
  padding: 0 1.6rem;
  margin-bottom: .6rem;
  box-sizing: border-box;
}

.step__item {
  display: inline-block;
  position: relative;
  height: 4.8rem;
  width: 15%;
}

.step__top {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  border-radius: 50%;
  background-color: #b6b8b9;
  font-size: 0.8rem;
}

.step__top--light {
  background-color: #2d8cf0;
  box-shadow: 0 0 0.8rem #4897eb;
}

.myicon-tick {
  position: relative;
}

.myicon-tick::before {
  content: "";
  position: absolute;
  width: 0.5rem;
  height: 0.7rem;
  color: #fff;
  border-right: 1.5px solid;
  border-bottom: 1.5px solid;
  left: -3px;
  top: 9px;
  transform-origin: center;
  transform: translate(-10%, -30%) rotate(45deg);
}

.step__label {
  position: absolute;
  bottom: 0.1rem;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.step__line {
  position: absolute;
  z-index: 1;
  top: 48%;
  transform: translateY(-50%);
  left: 10%;
  height: 2px;
}

.step__line--dark {
  width: 75%;
  background-color: #b6b8b9;
}
.step__line--light {
  background-color: #4897eb;
}

.detail__title {
  height: 3rem;
  line-height: 3rem;
  border-bottom: 1px solid #d3d1d1;
  padding-left: 0.4rem;
  font-size: 1rem;
}

.detail__container {
  padding: .6rem;
}

.detail__item {
  /* height: 1.6rem; */
  line-height: 1.6rem;
  margin: 0 0.4rem;
  font-size: 0.92rem;
}

.detail__label {
  display: inline-block;
  width: 5rem;
  vertical-align: top;
  color: #999999;
}

.detail__con {
  display: inline-block;
  color: #000;
}

.detail__img {
  margin: .4rem 0;
}

.dialog__img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
