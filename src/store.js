let savedUserInfo = JSON.parse(localStorage.getItem('user'));
if (!savedUserInfo) {
  savedUserInfo = {
    username: ''
  }
}

export default {
  user: savedUserInfo,
  adminUser: null,
  username: null
}