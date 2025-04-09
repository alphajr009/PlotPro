import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import '../SavedTemplates/SavedTemplatesWeb.css';
import Card from './Card.js';
import { FaSearch } from 'react-icons/fa';
import AxiosInstance from '../../AxiosInstance';
import { message, Empty, Modal, Button, Spin } from 'antd';

const SavedTemplatesWeb = ({
  onBackToSidebar,
  onCardClick,
  handleEditTemplateClick,
}) => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllTemplates = () => {
    setLoading(true);
    AxiosInstance.get(`/api/auth/mapTemplate/getAllTemplates`)
      .then((response) => {
        setTemplates(response.data);
        console.log('Templates fetched successfully');
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
        message.error('Failed to fetch templates');
        setLoading(false);
      });
  };

  const showDeleteConfirm = (template) => {
    setTemplateToDelete(template);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (templateToDelete) {
      AxiosInstance.delete(
        `/api/auth/mapTemplate/deleteTemplate/${templateToDelete._id}`
      )
        .then(() => {
          message.success('Template deleted successfully');
          setTemplates(
            templates.filter(
              (template) => template._id !== templateToDelete._id
            )
          );
          setDeleteModalVisible(false);
          setTemplateToDelete(null);
        })
        .catch((error) => {
          console.error(error);
          message.error('Failed to delete template');
        });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setTemplateToDelete(null);
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTemplates = templates.filter((template) =>
    template.templateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='innerDiv'>
        <div className='backBtnDiv'>
          <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
        </div>
        <div className='headingDiv'>
          <div className='search-container'>
            <input
              type='text'
              className='search-bar'
              placeholder='Search your templates'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch className='search-icon' />
          </div>

          <div className='cardsDiv'>
            {loading ? (
              <div className='spin-container'>
                <Spin size='large'>
                  <div className='content' />
                </Spin>
                <div className='loading-text'>Loading templates...</div>
              </div>
            ) : (
              <>
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <Card
                      key={template._id}
                      templateName={template.templateName}
                      location={template.location}
                      date={template.date}
                      imageUrl={template.imageUrl}
                      onClick={() => onCardClick(template)}
                      onDelete={() => showDeleteConfirm(template)}
                      onEdit={() => handleEditTemplateClick(template)}
                    />
                  ))
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>You don't have any templates yet</span>}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        title='Confirm Delete'
        visible={deleteModalVisible}
        onCancel={handleDeleteCancel}
        centered
        footer={[
          <Button key='cancel' onClick={handleDeleteCancel}>
            Cancel
          </Button>,
          <Button
            key='delete'
            type='primary'
            danger
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this template?</p>
      </Modal>
    </>
  );
};

export default SavedTemplatesWeb;
