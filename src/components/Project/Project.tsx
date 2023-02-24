import React, { useEffect, Fragment, useState } from 'react';
import { Button, Table, Input, Modal } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configStore';
import { fetchApiProjectList } from '../../redux/reducer/projectSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { membersType } from '../../types/projectType';
import { truncateText } from '../../utils';
import './Project.scss';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface DataType {
    key: React.Key;
    id: number;
    projectName: string;
    categoryName: string;
    creator: { id: number, name: string };
    members: any;
}





const Project: React.FC = () => {

    const { projectList } = useSelector((state: RootState) => state.projectSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(fetchApiProjectList(null));

    }, [])


    const navigate = useNavigate();

    // tìm kiếm khóa học
    const { Search } = Input;
    const onSearch = (value: string) => {
        if (value.length >= 1) {
            dispatch(fetchApiProjectList(value));
        } else {
            dispatch(fetchApiProjectList(null));
        }
    };


    const data = projectList;

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
            width: '10%',
            sorter: (a, b) => a.id - b.id,
            render: (text, project) => {
                return <p>{project.id}</p>
            }
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: '2',
            width: '20%',
            sorter: (a, b) => a.projectName.length - b.projectName.length,
            render: (text, project, index) => {
                return <NavLink to={`/project/board/${project.id}`} className='font-semibold text-sky-500 cursor-pointer hover:text-sky-700'>{project.projectName}</NavLink>
            }
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: '3',
            width: '20%',
            sorter: (a, b) => a.categoryName.length - b.categoryName.length,
            render: (text, project, index) => {
                return <p >{project.categoryName}</p>
            }
        },

        {
            title: 'Creator',
            dataIndex: 'creator',
            key: '4',
            width: '15%',
            render: (project) => {
                return <p>{project.name}</p>
            }
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: '5',
            width: '20%',
            render: (text, project, index) => {
                return <div key={index} className='members'>
                    {
                        project.members.map((ele: membersType, index: number) => {
                            if (index <= 1) {
                                return (
                                    <p key={index} className='memberShow'>
                                        {truncateText(ele.name, 2)}
                                        <span>{truncateText(ele.name, 18)}</span>
                                    </p>

                                )
                            }
                        })
                    }
                    <div className='increaseMember' >
                        {
                            project.members.length > 2 &&
                            <p className='seeMoreMember'>
                                +{project.members.length - 2}</p>
                        }
                        {
                            project.members.length > 2 &&
                            <div className='membersMore'>
                                {
                                    project.members.map((ele: membersType, index: number) => {
                                        if (index > 1) {
                                            return (
                                                <p key={index} className='memberShow'>
                                                    {truncateText(ele.name, 2)}
                                                    <span>{truncateText(ele.name, 18)}</span>
                                                </p>

                                            )
                                        }
                                    })
                                }
                            </div>
                        }
                    </div>

                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: '6',
            width: '15%',
            render: (text, project) => {
                return <Fragment>
                    <NavLink to={`/project/edit/${project.id * 1}`}> <EditOutlined className='text-green-600 text-2xl' /></NavLink>
                    
                </Fragment>
            }
        },

    ];

    return (
        <div className='container mx-auto px-10'>
            <div className="flex justify-between items-center mb-5 md:mb-10">
                <h3 className='text-2xl font-semibold'>Project</h3>
                <Button className='flex items-center bg-blue-500' onClick={() => navigate('/project/create-project')} type='primary' size='large' >Create Project</Button>

            </div>
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300, marginBottom: 30 }} />

            <Table rowKey={'projectName'} columns={columns} dataSource={data} />

        </div>
    )
}

export default Project;