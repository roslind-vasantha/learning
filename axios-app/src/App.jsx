import { Button, Input, Modal, Table } from "antd";
import { POST_SERVICES } from "./services/postServices";
import { useEffect, useState } from "react";

function App() {
  const initialPostState = {
    id: "",
    userId: "",
    title: "",
    body: "",
  };
  const [post, setPost] = useState(initialPostState);
  const [posts, setPosts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  // Modal open functions
  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Modal success functions
  const handleCreateOk = () => {
    setIsCreateModalOpen(false);
    setPost({});
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
    setPost({});
  };

  // Modal cancel functions
  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  // Function to handle input onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // API calls
  const getAllPosts = async () => {
    const res = await POST_SERVICES.getAll();
    setPosts(res);
  };

  const createPost = async (body) => {
    await POST_SERVICES.create(body);
    setPost({});
  };

  const updatePost = async (id, body) => {
    await POST_SERVICES.update(id, body);
  };

  const deletePost = async (id) => {
    await POST_SERVICES.deleteOne(id);
  };

  // Table columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "address",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "address",
    },
    {
      title: "Action",
      width: "200",
      render: (data) => (
        <div className="flex gap-1">
          <Button
            onClick={() => {
              showEditModal();
              setPost(data);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => deletePost(data.id)}>Delete</Button>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center">
        <p className="font-medium">Posts</p>
        <Table dataSource={posts} columns={columns} />
        <Button onClick={showCreateModal}>Create</Button>
      </div>
      {/* Create modal */}
      <Modal
        open={isCreateModalOpen}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        footer={[
          <Button key="back" onClick={handleCreateCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={() => {
              handleCreateOk();
              createPost(post);
            }}
          >
            Create
          </Button>,
        ]}
      >
        <Input
          name="id"
          placeholder="id"
          value={post.id}
          onChange={(event) => handleChange(event)}
        />
        <Input
          name="userId"
          placeholder="user id"
          value={post.userId}
          onChange={(event) => handleChange(event)}
        />
        <Input
          name="title"
          placeholder="title"
          value={post.title}
          onChange={(event) => handleChange(event)}
        />
        <Input
          name="body"
          placeholder="body"
          value={post.body}
          onChange={(event) => handleChange(event)}
        />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={[
          <Button key="back" onClick={handleEditCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={() => {
              handleEditOk();
              updatePost(post.id, post);
            }}
          >
            Update
          </Button>,
        ]}
      >
        <Input
          name="id"
          placeholder="id"
          value={post.id}
          onChange={(event) => handleChange(event)}
        />
        <Input
          name="userId"
          placeholder="user id"
          value={post.userId}
          onChange={(event) => handleChange(event)}
        />
        <Input
          name="title"
          placeholder="title"
          value={post.title}
          onChange={(event) => handleChange(event)}
        />
        <Input
          name="body"
          placeholder="body"
          value={post.body}
          onChange={(event) => handleChange(event)}
        />
      </Modal>
    </div>
  );
}

export default App;
