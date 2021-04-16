exports.isAdmin = (user_type_id) =>{
  return user_type_id === "1";
}

exports.isUser = (user_type_id) =>{
  return user_type_id === "0";
}
