import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/configStore';
import { Input } from 'antd';
import { asignUserType } from '../../../types/projectType';
import { projectService } from '../../../services/projectServices';
import Swal from 'sweetalert2';

const UserAsignProject: React.FC = () => {

    const { projectDetail } = useSelector((state: RootState) => state.projectSlice);
    const { userList } = useSelector((state: RootState) => state.userSlice);


    // tìm kiếm khóa học
    const { Search } = Input;
    const onSearch = (value: string) => {
        if (value.length >= 1) {

        } else {

        }
    };
    console.log(userList)
    console.log()


    const fetchApiAsignUserProject = async (id: number) => {
        try {
            const projectID: any = projectDetail?.id;
            const idBE: number = projectID * 1;
            let data: asignUserType = { projectId: idBE, userId: id }
            const res = await projectService.asignUserProject(data);
            console.log(res);
        } catch (err: any) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                text: err.response.data.message,
                showConfirmButton: true,
            })
        }
    }



    return (
        <div>
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300, marginBottom: 30 }} />
            <Row className='mt-5'>
                <Col span={12} className='h-96 overflow-scroll px-2'>
                    {
                        userList.map((ele: any, index: number) => {
                            return (

                                <div key={index} className='flex justify-between items-center border-b border-solid border-gray-300 last-of-type:border-none py-5'>
                                    <div className='flex justify-between items-center'>
                                        <img src={ele.avatar} alt='...' className='w-10 h-10 rounded-full border border-solid border-white cursor-pointer' />
                                        <div className='ml-4'>
                                            <h3 className='font-semibold text-[16px]'>{ele.name}</h3>
                                            <p>User ID: {ele.userId}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {

                                            fetchApiAsignUserProject(ele.userId);
                                        }}
                                        className='text-[14px] font-semibold px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200'>Add</button>
                                </div>

                            )
                        })}

                </Col>

                <Col span={12} className='h-96 overflow-y-scroll px-2'>
                    {
                        projectDetail?.members.map((user: any, index: number) => {

                            return (
                                <div key={index} className='flex justify-between items-center border-b border-solid border-gray-300 last-of-type:border-none py-5'>
                                    <div className='flex justify-between items-center'>
                                        <img src={user.avatar} alt='...' className='w-10 h-10 rounded-full border border-solid border-white cursor-pointer' />
                                        <div className='ml-4'>
                                            <h3 className='font-semibold text-[16px]'>{user.name}</h3>
                                            <p>User ID: {user.userId}</p>
                                        </div>
                                    </div>
                                    <button className='text-[14px] font-semibold px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 transition-all duration-200'>Remove</button>
                                </div>
                            )

                        })
                    }
                </Col>
            </Row>

        </div>
    )
}

export default UserAsignProject