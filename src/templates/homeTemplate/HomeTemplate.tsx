import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    FileProtectOutlined,
    TeamOutlined,
    FileAddOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import CreateTask from '../../components/tasks/CreateTask';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configStore';
import { changeModelControlAction } from '../../redux/reducer/projectSlice';
import { useDispatch } from 'react-redux';
import { fetchApiLoginAction, fetchApiUserList } from '../../redux/reducer/userSlice';
import Swal from 'sweetalert2';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}



const HomeTemplate: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { modelController } = useSelector((state: RootState) => state.projectSlice);
    const { profile } = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        appDispatch(fetchApiUserList(''));
    }, [])
    // open task model
    const handleOpenTaskModel = () => {
        dispatch(changeModelControlAction(true))
    }

    const handleLogout = () => {

        const data: any = null
        Swal.fire({
            title: 'Bạn có muốn đăng xuất',
            icon: 'question',
            confirmButtonText: 'Đăng Xuất',
            showCancelButton: true,
            cancelButtonText: 'Hủy Bỏ',
        }).then((result: any) => {
            if (result.isConfirmed) {
                dispatch(fetchApiLoginAction(data));
                localStorage.removeItem('Token');
                navigate('/');
                Swal.fire('Đăng Xuất Thành Công !', '', 'success');
            }

        })
    }


    const items: MenuItem[] = [


        getItem('Project', 'sub1', <FileProtectOutlined />, [
            getItem(<NavLink to='/project'>View All Project</NavLink>, '1', <FileProtectOutlined />),
            getItem(<NavLink to='/project/create-project'>Create Project</NavLink>, '2', <FileAddOutlined />),
        ]),
        getItem(<button onClick={handleOpenTaskModel}>Create Task</button>, '9', <FileOutlined />),
    ];


    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 30 }} className='flex items-center'>
                    <img style={{ width: 40 }} src={require('../../assets/Jira-Emblem.png')} alt="logo" />
                    <h1 className='text-white text-3xl font-semibold ml-3 uppercase'>Jira</h1>
                </div>

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout relative">
                <div className='py-3 px-10 text-right'>
                    <img src={profile?.avatar} alt="..." className='h-12 w-12 rounded-full inline-block' />
                    <span className='mx-2 text-xl text-gray-400'>|</span>

                    <LogoutOutlined
                        onClick={handleLogout}
                        className='text-black text-2xl cursor-pointer hover:text-rose-500 transition-all duration-200' />

                </div>
                <Content style={{ margin: '16px, 16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Outlet />
                        {modelController && <CreateTask />}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>

            </Layout>
        </Layout>
    );
};

export default HomeTemplate;
