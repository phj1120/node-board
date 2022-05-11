http://localhost:8080/#/join

<template>
  <v-layout class="background" align-center justify-center>
    <div class="form">
      <v-text-field v-model="form.id" label="아이디"></v-text-field>
      <v-text-field v-model="form.name" label="이름" type="name"></v-text-field>
      <v-text-field
        v-model="form.password"
        label="비밀번호"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="form.passwordConfirm"
        label="비밀번호 확인"
        type="password"
      ></v-text-field>
      <v-btn block @click="join">회원가입</v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },

  methods: {
    join() {
      if (this.form.id == "") {
        window.alert("아이디를 입력해 주세요");
        return;
      }
      if (this.form.name == "") {
        window.alert("이름을 입력해 주세요");
        return;
      }
      if (this.form.password.length < 8) {
        window.alert("비밀 번호는 8자 이상이어야 합니다");
        return;
      }
      if (this.form.password != this.form.passwordConfirm) {
        window.alert("비밀 번호가 일치하지 않습니다");
        return;
      }

      this.axios.post("/api/users/join", this.form).then((result) => {
        console.log(result.data);
        if (result.data.result == "ok") {
          window.alert("회원가입 완료");
          this.$router.push("/");
        }
        if (result.data.result == "fail") {
          window.alert(result.data.message);
          form.id = "";
          form.name = "";
          form.password = "";
          fomr.passwordConfirm = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.background {
  background: #eeeeee;
}
.background .form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
