
import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { projectService } from '../../../services/projectServices';
import * as Yup from 'yup';
import { CreateProjectType } from '../../../types/projectType';
import Swal from 'sweetalert2';





const CreateProject: React.FC = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchApiCategoryList();
    }, []);


    const fetchApiCategoryList = async () => {
        try {
            const res = await projectService.getAllCategory();

            setCategories(res.data.content)
        } catch (err) {
            console.log(err);
        }
    }


    const formik = useFormik({
        initialValues: {
            projectName: '',
            description: '',
            categoryId: 0,
            alias: '',
        },
        onSubmit: async (value: CreateProjectType) => {
            try {
                await projectService.createProjectAPI(value);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Create Project Success!',
                    text: 'Do you want to see all project!',
                    showConfirmButton: true,
                    showCancelButton: false,
                })
                navigate('/project');
            } catch (err) {
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Check again!',
                    showConfirmButton: true,
                })
            }

        },
    });

    // set value for category
    const handleChangeCategory = (value: number) => {
        formik.setFieldValue('categoryId', value);
    };

    // set value for description
    const textChange = (e: any) => {
        const data = e.target.getContent();
        formik.setFieldValue('description', data);
    }

    return (
        <div className='container mx-auto px-40'>
            <div className='mb-10'>
                <NavLink to='/project'><span className='text-gray-400 hover:text-sky-400'>Project</span></NavLink>
                <span className='mx-2'>/</span>
                <span>New Project</span>
            </div>

            <Form onSubmitCapture={formik.handleSubmit} name="form_item_path" layout="vertical">
                <h1 className='text-2xl font-semibold mb-5'>New Project</h1>
                <Form.Item label="Project name" required={true}>
                    <Input onChange={formik.handleChange} name='projectName' placeholder='Project Name' />
                </Form.Item>

                <Form.Item label="Alias" required={true}>
                    <Input onChange={formik.handleChange} name='alias' placeholder='Alias' />
                </Form.Item>

                <Form.Item label="Project category" required={true}>
                    <Select
                        style={{ width: 350 }}
                        placeholder='Select Your Category'
                        onChange={handleChangeCategory}
                        options={
                            categories.map((ele: { id: number, projectCategoryName: string }, index: number) => {
                                return (
                                    { value: ele.id, label: ele.projectCategoryName }
                                )
                            })}
                    />
                </Form.Item>

                <Form.Item label="Descriptions">
                    <Editor
                        onChange={textChange}
                        apiKey="wumtctoa4zi0a1l66upxgydpoqz6d9jqqw9d26a862f6gfia"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor forecolor fontsize | alignleft aligncenter  ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </Form.Item>

                <button
                    className='bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300'
                    type="button">
                    <NavLink className='hover:text-gray-700' to='/project'>Cancel</NavLink>
                </button>

                <button
                    className='bg-sky-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-sky-900 transition-all duration-300 ml-5'
                    type="submit">
                    Submit
                </button>
            </Form>
        </div >
    );
};

export default CreateProject;