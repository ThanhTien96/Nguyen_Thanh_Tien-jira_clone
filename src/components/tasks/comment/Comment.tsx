import React from 'react'


interface propsComment {
    data: {
        avatar:string;
        commentContent:string;
        id:number;
        idUser: number;
        name: string;
    },
}

const Comment: React.FC <propsComment>= (props) => {
    return (
        <div className='px-2 mt-5 flex'>

            <img src={props.data.avatar} alt='...' className='w-10 h-10 rounded-full border border-solid border-white cursor-pointer' />


            <div className='ml-3'>

                <p className='font-semibold text-lg text-gray-500 hover:text-black transition-all duration-500 cursor-pointer'>cyberLearn</p>
                <div className='my-3' dangerouslySetInnerHTML={{__html: props.data.commentContent}}></div>

                <div>
                    <button className='mr-3 text-gray-500 font-semibold hover:text-black transition-all duration-200'>Edit</button>
                    <button className='mr-3 text-gray-500 font-semibold hover:text-black transition-all duration-200'>Delete</button>

                </div>
            </div>
        </div>
    )
}

export default Comment