import bcrypt  from 'bcrypt'
export default async function signupvalidation(collection,query,data) {
  let a;
  let b;
  let c;
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
  if(query.email == "" || !query.email){
    c = false
  }else{
    c = true
  }
  let check = a && b && c;
  const seccheck = data.find(ids => ids.username == query.username);
  if(!seccheck){
    if(!check){
      return "Form Is Not Fill Up!"
    }else{
      const {username , password , email} = query;
      const hashed = await bcrypt.hash(password , 10)
      collection.insertOne({ username : username , password: hashed , email: email , admin: query.admin})

      return {
        "message":"User Was Signup!",
        "data": { username : username , password: hashed , email: email}
      }
    }
  }else{
    if(!check){
      return "Form Is Not Fill Up!"
    }else{
      return {
        "message": "User Was Exist!"
      }
    }
  }
}