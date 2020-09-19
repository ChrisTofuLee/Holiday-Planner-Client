import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Typography,
  Card,
  Button,
  Form,
  Switch,
  Input,
  Collapse,
  List,
  Avatar,
  Space,
  Modal,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import UserContext from "../context/UserContext";
import seaside from "../assets/seaside1.jpg";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const API_URL = process.env.API_URL || "http://localhost:8000";

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [foodData, setFoodData] = useState("");
  const [nightlifeData, setNightlifeData] = useState("");
  const [activitiesData, setActivitiesData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [foodCheck, setFoodCheck] = useState(false);
  const [activitiesCheck, setActivitiesCheck] = useState(false);
  const [nightlifeCheck, setNightlifeCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //should be a way to extract true or false from switch without function as it's in a form.item?
  const handleFoodSwitch = (checked) => {
    setFoodCheck(checked);
  };
  const handleNightlifeSwitch = (checked) => {
    setNightlifeCheck(checked);
  };
  const handleActivitiesSwitch = (checked) => {
    setActivitiesCheck(checked);
  };

  // submit button functionality
  const handleFormSubmit = async ({ searchTerm }) => {
    try {
      setLoading(true);
      console.log(searchTerm, nightlifeCheck);
      const payload = {
        // activities, food, nightlife, searchTerm
        searchTerm,
        nightlife: nightlifeCheck,
        food: foodCheck,
        activities: activitiesCheck,
      };
      const { data } = await axios.post(`${API_URL}/api/cities`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(data);
      const { foodResults, nightlifeResults, activitiesResults } = data;
      setFoodData(foodResults);
      setNightlifeData(nightlifeResults);
      setActivitiesData(activitiesResults);
      setShowResults(true);
      setLoading(false);

      console.log(foodData, nightlifeData, activitiesData);
    } catch (error) {
      setError(`Login failed - ${error.message}`);
    }
  };

  // modal functionality
  const showModal = () => {
    setModalVisible(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setModalVisible(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${seaside})`,
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "500px",
        }}
      ></div>
      <div
        style={{
          marginTop: "-400px",
          marginRight: "200px",
          marginLeft: "200px",
          backgroundColor: "rgba(250,250,250,.48)",
        }}
      >
        <Row>
          <Col span={12}>
            <Title level={2}>Discover what you can do on your next trip</Title>
            <Text>
              Find activities and points of interest to inspire an itinerary for
              your next trip
            </Text>
          </Col>
          <Col span={12}>
            <Card
              title="Search for a city"
              headStyle={{
                backgroundColor: "#FAFAFA",
                color: "red",
                fontSize: "30px",
                textAlign: "center",
              }}
              bordered={false}
              style={{
                width: 500,
                boxShadow: "-1px 3px 14px -6px rgba(120,111,120,.48)",
              }}
            >
              <Form style={{ textAlign: "center" }} onFinish={handleFormSubmit}>
                <Form.Item
                  label="Search City"
                  name="searchTerm"
                  rules={[
                    {
                      required: true,
                      message: "Please input a destination",
                    },
                  ]}
                >
                  <Input style={{ borderRadius: "25px" }} />
                </Form.Item>
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Nightlife">
                    <Switch
                      style={{ color: "red" }}
                      checkedChildren={
                        <CheckOutlined
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                      unCheckedChildren={
                        <CloseOutlined
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                      onChange={handleNightlifeSwitch}
                    />
                  </Form.Item>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Daytime" style={{ marginLeft: "20px" }}>
                    <Switch
                      style={{ color: "red" }}
                      checkedChildren={
                        <CheckOutlined
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                      unCheckedChildren={
                        <CloseOutlined
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                      onChange={handleActivitiesSwitch}
                    />
                  </Form.Item>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Food" style={{ marginLeft: "20px" }}>
                    <Switch
                      id="Food"
                      style={{ color: "red" }}
                      onChange={handleFoodSwitch}
                      checkedChildren={
                        <CheckOutlined
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                      unCheckedChildren={
                        <CloseOutlined
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                    />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    shape="round"
                    style={{ width: "120px" }}
                    size="large"
                    danger
                    type="primary"
                    htmlType="submit"
                  >
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        {/* id state with data then show below row */}
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Collapse defaultActiveKey={["1"]} onChange={callback}>
            <Panel header="Food list" key="1" style={{ minWidth: "1000px" }}>
              {foodData ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 4,
                  }}
                  dataSource={foodData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.name}
                      actions={[
                        <div>
                          <Button type="primary" onClick={showModal}>
                            <IconText
                              icon={StarOutlined}
                              text="Save to plan"
                              key="list-vertical-star-o"
                            />
                          </Button>
                          <Modal
                            title="Basic Modal"
                            visible={modalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <Form
                              name="newPlan"
                              layout="inline"
                              onFinish={console.log("form submit")}
                              initialValues={{
                                price: {
                                  planName: "",
                                },
                              }}
                            >
                              <Form.Item
                                name="planName"
                                rules={
                                  [
                                    // {
                                    //   validator: checkPrice,
                                    // },
                                  ]
                                }
                              >
                                <Input placeholder="New Plan?" />
                              </Form.Item>
                              <Form.Item>
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </Form.Item>
                            </Form>
                            <p>existing plan</p>
                            <p>Some contents...</p>
                          </Modal>
                        </div>,
                        <IconText
                          icon={LikeOutlined}
                          text="156"
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text="2"
                          key="list-vertical-message"
                        />,
                      ]}
                      extra={
                        <img
                          style={{ height: "200px", width: "300px" }}
                          alt="logo"
                          src={item.photo}
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.icon} />}
                        title={<a href={item.name}>{item.name}</a>}
                        description={item.address}
                      />
                      {item.type}, input detail api call here
                    </List.Item>
                  )}
                />
              ) : (
                <p>No data</p>
              )}
            </Panel>
            <Panel header="Activities List" key="2">
              {activitiesData ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 4,
                  }}
                  dataSource={activitiesData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.name}
                      actions={[
                        <IconText
                          icon={StarOutlined}
                          text="156"
                          key="list-vertical-star-o"
                        />,
                        <IconText
                          icon={LikeOutlined}
                          text="156"
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text="2"
                          key="list-vertical-message"
                        />,
                      ]}
                      extra={<img width={272} alt="logo" src={item.photo} />}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={null} />}
                        title={<a href={item.name}>{item.name}</a>}
                        description={item.address}
                      />
                      {item.type}
                    </List.Item>
                  )}
                />
              ) : (
                <p>No data</p>
              )}
            </Panel>
            <Panel header="Nightlife list" key="3">
              {nightlifeData ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 4,
                  }}
                  dataSource={nightlifeData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.name}
                      actions={[
                        <IconText
                          icon={StarOutlined}
                          text="156"
                          key="list-vertical-star-o"
                        />,
                        <IconText
                          icon={LikeOutlined}
                          text="156"
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text="2"
                          key="list-vertical-message"
                        />,
                      ]}
                      extra={<img width={272} alt="logo" src={item.photo} />}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={null} />}
                        title={<a href={item.name}>{item.name}</a>}
                        description={item.address}
                      />
                      {item.type}
                    </List.Item>
                  )}
                />
              ) : (
                <p>No data</p>
              )}
            </Panel>
          </Collapse>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
