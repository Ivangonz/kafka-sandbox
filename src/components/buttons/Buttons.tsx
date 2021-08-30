import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ButtonsStyles.css';
import Axios from 'axios';



export interface ImageTypes {
    userId: number;
    id: number;
    title: string;
    body: string;

}

// const itemData: ImageTypes[]= [
 
//     {
//       id: 1,
//       text: 'test test test',
//       fruit: 'apples apples'
 
//     },
//     {
//       id: 2,
//       text: 'test2 test2 test2',
//       fruit: 'grapes grapes'
 
//     },
//     {
//       id: 3,
//       text: 'test3 test3 test3',
//       fruit: 'bananos'
 
//     },

  
//   ];


const Buttons = () => {

    const [applesarray, setApplesarray] = useState<ImageTypes[]>([])
    const [orangesarray, setOrangesarray] = useState<ImageTypes>()

    console.log(orangesarray)
    const getData = async () => {
        try {

            let {data} = await Axios({
                method: 'get',
                url: `https://jsonplaceholder.typicode.com/posts/`,
            })
            // console.log(data);
            setApplesarray(data)
            // return data;

        } catch (error) {
            console.log('cannot load api: ', error);
 
        }
    }

    const handleSubmit = async(buttonQuery: any) => {
        try {

            let {data} = await Axios({
                method: 'get',
                url: `https://jsonplaceholder.typicode.com/posts/${buttonQuery}`,
            })
            console.log(data);
            setOrangesarray(data)
            // return data;

        } catch (error) {
            console.log('cannot load api: ', error);
 
        }
    }

    useEffect(() => {
        getData();
        
    }, [])


    return (
        <div className="buttonWrapper">
 

            {applesarray && applesarray.slice(0, 4).map((one, index) => { 
                return(
                    <div className="buttonCard" key={index}>
                        <div>{one.id}</div>
                        <div>{one.title}</div>
                        <div>{one.body}</div>
                        <button onClick={() => handleSubmit(one.id)}>Push ID:{one.id}</button>
                    </div>
                )

            })}
            {/* {orangesarray && orangesarray.map((one, index) => { 
                return( */}
                    <div className="buttonCard" >
                        <div>{orangesarray?.id}</div>
                        <div>{orangesarray?.title}</div>
                        <div>{orangesarray?.body}</div>
                        {/* <button onClick={() => handleSubmit(one)}>Push ID:{one.id}</button> */}
                    </div>
                {/* )

            })} */}
            
        </div>
    )
}

export default Buttons
