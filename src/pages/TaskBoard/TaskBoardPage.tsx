import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import UserAsignProject from '../../components/Project/userAsignProject/UserAsignProject';
import TaskControl from '../../components/tasks/taskBoard/TaskControl';
import { RootState, useAppDispatch } from '../../redux/configStore';
import { fetchApiProjectDetailAction } from '../../redux/reducer/projectSlice';
import { truncateText } from '../../utils';
import './TaskBoard.scss'

const TaskBoardPage: React.FC = () => {

    const { projectDetail } = useSelector((state: RootState) => state.projectSlice);
    const dispatch = useAppDispatch();
    const params = useParams();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const id: any = params.id;
        const newID: number = id * 1;
        dispatch(fetchApiProjectDetailAction(newID));
    }, [])


    return (
        <div className='container mx-auto px-10'>
            <div className='mb-10'>
                <NavLink to='/project'><span className='text-gray-400 hover:text-sky-400'>Project</span></NavLink>
                <span className='mx-2'>/</span>
                <span>{projectDetail?.projectName}</span>
            </div>
            <div className='flex items-center'>
                <h3 className='font-semibold text-2xl'>BOARD</h3>
                <div className='ml-20 flex items-center'>
                    <p className='text-lg font-medium mr-5'>Members:</p>
                    <div className='flex'>
                        {
                            projectDetail?.members.map((ele: any, index: number) => {
                                return (
                                    <p key={index} className='projectMembers'>
                                        {truncateText(ele.name, 2)}
                                        <span>{truncateText(ele.name, 17)}</span>
                                    </p>
                                )
                            })
                        }

                        <button onClick={() => setOpen(true)} className='w-8 h-8 leading-8 rounded-full bg-rose-200 text-center border border-solid border-white cursor-pointer'>+</button>
                    </div>
                </div>
            </div>

            <TaskControl />

            <Modal
                title={`Add member to project ${projectDetail?.projectName}`}
                centered
                open={open}
                closable={true}
                onCancel={() => setOpen(false)}
                footer={null}
                width={800}
            >
                <UserAsignProject />
                
            </Modal>

        </div>
    )
}

export default TaskBoardPage