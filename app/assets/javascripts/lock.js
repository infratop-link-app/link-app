function myEnter(){
  const LOCK_PASSWORD = gon.index_key;
  myPassWord=prompt("パスワードを入力してください","");
  if ( myPassWord == LOCK_PASSWORD ){
      location.href="links/blue_index";
  }else{
      alert( "パスワードが違います!" );
  }
}