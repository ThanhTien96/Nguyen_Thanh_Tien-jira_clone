import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { projectService } from '../../../services/projectServices';
import { projectDetailType } from '../../../types/projectType';
import Swal from 'sweetalert2';





const EditProject: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [projectDetail, setProjectDetail] = useState<projectDetailType>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetchApiCategoryList();
        fetchApiProjectDetail();
    }, []);

    // fetch api lấy danh sách danh mục
    const fetchApiCategoryList = async () => {
        try {
            const res = await projectService.getAllCategory();
            setCategories(res.data.content)
        } catch (err) {
            console.log(err);
        }
    }
    //fetch api lấy thông tin project
    const fetchApiProjectDetail = async () => {
        try {
            const id:any = params.id;
            const newId = id * 1;
            const res = await projectService.getProjectDetail(newId);
            await setProjectDetail(res.data.content)
        } catch (err) {
            console.log(err);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id:projectDetail?.id,
            projectName: projectDetail?.projectName,
            creator: projectDetail?.creator.id,
            description: projectDetail?.description,
            categoryId: projectDetail?.projectCategory.id,
        },
        onSubmit: async (value: any) => {
            console.log(value);
            try {
                const res = await projectService.updateProject(value, value.id);
                console.log(res);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: true,
                })
                navigate('/project');
            } catch (err:any) {
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: err.response.data.content,
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
                <span>Eit Project</span>
            </div>

            <Form onSubmitCapture={formik.handleSubmit} name="form_item_path" layout="vertical">
                <h1 className='text-2xl font-semibold mb-5'>Edit Project</h1>
                
                <Form.Item label="ID" required={true}>
                    <Input disabled name='id' onChange={formik.handleChange} value={formik.values.id} />
                </Form.Item>
                
                <Form.Item label="Project name" required={true}>
                    <Input onChange={formik.handleChange} name='projectName' value={formik.values.projectName} />
                </Form.Item>

                <Form.Item label="Project category" required={true}>
                    <Select
                        style={{ width: 350 }}
                        value={formik.values.categoryId}
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
                        initialValue={formik.values.description}
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
                                'bold italic backcolor forecolor fontsize | alignleft aligncenter ' +
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
}

export default EditProject