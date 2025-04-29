import bcrypt from 'bcrypt'
export default async function loginvalidation(data,query) {
  let a;
  let b;
  if(query.username == "" || !query.username){
    a = false
  }else{
    a = true
  }
  if(query.password == "" || !query.password){
    b = false
  }else{
    b = true
  }
  let check = a && b;
  let com;
  const seccheck = data.find(ids => ids.username == query.username);
    await Promise.all(data.map(async (e) => {
    com = await bcrypt.compare(query.password, e.password);
  }));
  let check2 = seccheck && com
  //  console.log(check2)
  if(!check2){
    if(!check){
      return "Form Is Not Fill Up!"
    }else{
      return { "message" : "Username Or Password Was Wrong!"}
    }
  }else{
    if(!check){
      return "Form Is Not Fill Up!"
    }else{
      return {
        "message": "User Was Login!",
        "data": seccheck
      }
    }
   
  }
}