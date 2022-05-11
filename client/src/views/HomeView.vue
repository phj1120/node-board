http://localhost:8080/

<template>
  <v-layout class="background" align-center justify-center>
    <div class="form">
      <v-text-field v-model="form.id" label="아이디"></v-text-field>
      <v-text-field
        v-model="form.passwd"
        label="비밀번호"
        type="password"
      ></v-text-field>
      <v-btn @click="login" class="mr-2">로그인</v-btn>
      <v-btn @click="moveJoin">회원가입</v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      form: {
        id: "",
        passwd: "",
      },
    };
  },
  methods: {
    login() {
      if (this.form.id == "") {
        window.alert("아이디를 입력하세요.");
        return;
      }
      if (this.form.passwd.length < 8) {
        window.alert("비밀번호는 8자 이상입니다.");
        return;
      }

      this.axios
        .post("/api/users/login", {
          id: this.form.id,
          password: this.form.passwd,
        })
        .then((result) => {
          // result.status===404 으로 하니 아예 여기 안 들어옴
          console.log(result.data.result);
          if (result.data.result === "ok") {
            this.boardList = result.data;
            this.$router.push("/board");
          } else if (result.data.result === "fail") {
            window.alert(result.data.message);
            (this.form.id = ""), (this.form.passwd = "");
          }
        });
    },
    moveJoin() {
      this.$router.push("/join");
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
