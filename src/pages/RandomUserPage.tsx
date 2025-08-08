import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function RandomUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [isFirstload,setFirstload] = useState(true);
  useEffect(() => {
    const storedAmount = localStorage.getItem("genAmount");
    if (storedAmount !== null) {
      setGenAmount(Number(storedAmount));
    }
  }, []);

   useEffect(() => {
    if(isFirstload){
      setFirstload(false);
      return;
    }
    localStorage.setItem("genAmount", String(genAmount));
  }, [genAmount]);

const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    setUsers(users.map(cleanUser));
   


    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/CleanUser
    //Then update state with function : setUsers(...)
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => setGenAmount(event.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((user : any, index: number) => 
    <UserCard
    key={user.id ?? index}
    name={user.name} 
    imgUrl={user.imgUrl} 
    address={user.address} 
    email={user.email}
  />
  )}
    </div>
  );
}
