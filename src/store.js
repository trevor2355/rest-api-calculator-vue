let savedUserInfo = JSON.parse(localStorage.getItem('user'));
if (!savedUserInfo) {
  savedUserInfo = {
    username: ''
  }
}

let savedAdminUserInfo = JSON.parse(localStorage.getItem('adminUser'));
if (!savedUserInfo) {
  savedUserInfo = {
    username: ''
  }
}

export default {
  user: savedUserInfo,
  adminUser: savedAdminUserInfo,
  username: null
}