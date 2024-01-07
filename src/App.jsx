import React, { useState, useEffect } from "react";
import { supabase } from "./Client";
import "./App.css";
const App = () => {
  const [Projects, setProject] = useState([]);
  const [user, setUser] = useState({
    ename: "",
    age: "",
  });

 

  const [user2,setUser2]=useState
  ({
    id:'',ename:"",age:""
  })
  console.log(user2);
  const handleChange = (e) => {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };


  const handleChange2 = (e) => {
    setUser2((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };




  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    const { data } = await supabase.from("Projects").select("*");
    setProject(data);
    console.log(Projects);
  }

  async function createUser() {
    await supabase
      .from("Projects")
      .insert({ ename: user.ename, age: user.age });

      fetchProject();
  }

async function delUser(uid){
  
const { data,error } = await supabase
.from('Projects')
.delete()
.eq('id', uid);


fetchProject();
if(error)
{
  console.log(error);
}
if(data)
{
  console.log(data);
}
}

async function EditUser(uid)
{
 
const { data,error } = await supabase
.from('Projects')
.update({ ename: user2.ename , age:user2.age })
.eq('id', uid);

fetchProject();

if(error)
{
  console.log(error);
}
if(data)
{
  console.log(data);
}

}

function displayUser(uid)
{
  Projects.map((project)=>{
    if(project.id==uid)
    {
      setUser2({id:project.id,ename:project.ename,age:project.age})
    }

  })
   
}


  return (
    <div>





      {/* form 1 */}
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          name="ename"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>

     {/* form2 */}

     <form onSubmit={()=>EditUser(user2.id)}>
        <input
          type="text"
          placeholder="Name"
          name="ename"
          onChange={handleChange2}
          defaultValue={user2.ename}
        />

        <input
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleChange2}
          defaultValue={user2.age}
        />
        <button type="submit">Save Changes</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {Projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.ename}</td>
              <td>{project.age}</td>
              <td>
                <button onClick={()=>{delUser(project.id)}}>Delete</button>
                <button onClick={()=>{displayUser(project.id)}}>Edit</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
