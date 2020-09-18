import React, { useState } from "react";
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
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";

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
  const [foodData, setFoodData] = useState([])
  const [nightlifeData, setNightlifeData] = useState([])
  const [activitiesData, setActivitiesData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [foodCheck, setFoodCheck] = useState(false)

  //should be a way to extract true or false from switch without function as it's in a form.item?
    const handleSwitch = (checked) => {
      setFoodCheck(checked)
    }

  const handleFormSubmit = async ({searchTerm, activities, food, nightlife}) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
      activities, food, nightlife, searchTerm
    })
    const {foodResults, nightlifeResults, activitiesResults} = data
    setFoodData(foodResults)
    setNightlifeData(nightlifeResults)
    setActivitiesData(activitiesResults)
    setShowResults(true)
    console.log(foodResults)
  }
    catch (error) {
      setError(`Login failed - ${error.message}`);
    }}

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
                <Form.Item label="Input" name="searchTerm" rules={[
          {
            required: true,
            message: "Please input a destination",
          },
        ]}>
                  <Input style={{borderRadius: "25px"}}/>
                </Form.Item>
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Nightlife" name="nightlife">
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
                      defaultUnChecked
                      // onChange={handleFoodChecker}
                    />
                  </Form.Item>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Daytime" name="activities" style={{ marginLeft: "20px" }}>
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
                      defaultUnChecked
                    />
                  </Form.Item>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Food" name="food" style={{ marginLeft: "20px" }}>
                    <Switch
                    id="Food"
                      style={{ color: "red" }}
                      onChange={handleSwitch}
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
                      defaultUnChecked
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
        >Search</Button>
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
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            {/* <Panel header="This is panel header 2" key="2">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={test}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
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
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Panel> */}
            <Panel header="This is panel header 3" key="3" disabled>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
