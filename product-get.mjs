export default async function get(coll,id) {
  if(!id){
    const res = await coll.find().toArray()
    return res;
  }else{
    const res = await coll.find().toArray()
    const res2 = res.find(ids => ids.id == id)
    return res2;
  }
}