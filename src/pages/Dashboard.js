import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SaveModal from "../components/SaveModal";
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
  Modal,
  Divider,
  Comment,
  Tag,
  Skeleton,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  PushpinOutlined,
  StarOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import UserContext from "../context/UserContext";
import seaside from "../assets/seaside1.jpg";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001"
    : "https://limitless-eyrie-86412.herokuapp.com";

function callback(key) {
  console.log(key);
}

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
  const [modalVisibleSave, setModalVisibleSave] = useState(false);
  const [foodModalVisibleSave, setFoodModalVisibleSave] = useState(false);
  const [activitiesModalVisibleSave, setActivitiesModalVisibleSave] = useState(
    false
  );
  const [modalVisibleViewMore, setModalVisibleViewMore] = useState(false);
  const [foodModalVisibleViewMore, setFoodModalVisibleViewMore] = useState(
    false
  );
  const [
    activitiesModalVisibleViewMore,
    setActivitiesModalVisibleViewMore,
  ] = useState(false);
  const [requiredSwitch, setRequiredSwitch] = useState(false);
  const [savedPlans, setSavedPlans] = useState("");
  const [failSave, setFailSave] = useState(false);
  const [failPlanSave, setFailPlanSave] = useState(false);

  //should be a way to extract true or false from switch without function as it's in a form.item?
  const handleFoodSwitch = (checked) => {
    setFoodCheck(checked);
  };
  const handleNightlifeSwitch = (checked) => {
    setNightlifeCheck(checked);
  };
  const handleActivitiesSwitch = (checked) => {
    setActivitiesCheck(checked);
    console.log(activitiesCheck);
  };

  // submit button functionality
  const handleFormSubmit = async ({ searchTerm }) => {
    if (!nightlifeCheck && !foodCheck && !activitiesCheck) {
      console.log("check one please");
      setRequiredSwitch(true);
    } else {
      try {
        setRequiredSwitch(false);
        setShowResults(true);
        setLoading(true);
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

        setLoading(false);

       console.log("submitForm")
      } catch (error) {
        setError(`Login failed - ${error.message}`);
      }
    }
  };

  // modal functionality
  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await axios.get(`${API_URL}/api/plans`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSavedPlans(data.allPlans);
      console.log("plan fetched");
    };
    fetchPlans();
  }, [setSavedPlans, user.token]);

  const showSaveModal = async (e) => {
    console.log(e.target.id)
    if (e.target.id === "foodSaveBtn") {
      setFoodModalVisibleSave(true);
    } else if (e.target.id === "ActivitiesSaveBtn") {
      setActivitiesModalVisibleSave(true);
    } else {
      setModalVisibleSave(true);
    }
    const { data } = await axios.get(`${API_URL}/api/plans`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setSavedPlans(data.allPlans);
    
  };
  const handleModalSaveOk = (e) => {
    console.log(e);
    if (modalVisibleSave === true) {
      setModalVisibleSave(false);
    }
    if (foodModalVisibleSave === true) {
      setFoodModalVisibleSave(false);
    }
    if (activitiesModalVisibleSave === true) {
      setActivitiesModalVisibleSave(false);
    }
  };
  const handleModalSaveCancel = () => {
    if (modalVisibleSave === true) {
      setModalVisibleSave(false);
    }
    if (foodModalVisibleSave === true) {
      setFoodModalVisibleSave(false);
    }
    if (activitiesModalVisibleSave === true) {
      setActivitiesModalVisibleSave(false);
    }
  };
  const showModalViewMore = (e) => {
    console.log(e.target);
    if (e.target.id === "foodButton") {
      setFoodModalVisibleViewMore(true);
    } else if (e.target.id === "activitiesButton") {
      setActivitiesModalVisibleViewMore(true);
    } else {
      setModalVisibleViewMore(true);
    }
  };
  const handleModalViewMoreOk = (e) => {
    console.log(e);
    if (modalVisibleViewMore === true) {
      setModalVisibleViewMore(false);
    }
    if (foodModalVisibleViewMore === true) {
      setFoodModalVisibleViewMore(false);
    }
    if (activitiesModalVisibleViewMore === true) {
      setActivitiesModalVisibleViewMore(false);
    }
  };
  const handleModalViewMoreCancel = (e) => {
    console.log(e);
    if (modalVisibleViewMore === true) {
      setModalVisibleViewMore(false);
    }
    if (foodModalVisibleViewMore === true) {
      setFoodModalVisibleViewMore(false);
    }
    if (activitiesModalVisibleViewMore === true) {
      setActivitiesModalVisibleViewMore(false);
    }
  };

  // useEffect(() => {
  //   if (!savedPlans) {
  //     return;
  //   }
  //   console.log("save modal reload");
  //   showSaveModal();
  // }, [savedPlans, showSaveModal]);

  const saveNewPlan = async (planName) => {
    setFailPlanSave(false);
    const planChecker = (planName) => {
      const planByName = savedPlans.find(
        (plan) => plan.title === planName.planName
      );

      return planByName || null;
    };
    if (planChecker(planName, savedPlans) === null) {
      setFailSave(false);

      await axios.post(`${API_URL}/api/plans`, planName, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setFailSave(false);
      showSaveModal();
      // const { foodResults, nightlifeResults, activitiesResults } = data;
      // setFoodData(foodResults);
      // setModalVisibleSave(false);
    } else {
      setFailSave(true);
      showSaveModal();
    }
  };

  const saveToPlan = async (event) => {
    event.preventDefault();
    setFailPlanSave(false);
    const googleId = event.target.className;
    const combinedData = foodData.concat(nightlifeData, activitiesData);
    const dataToInject = combinedData.find(
      (location) => location.googlePlacesId === googleId
    );

    const { id } = event.target;

    const placeChecker = (googleId) => {
      const planToCheck = savedPlans.find((plans) => plans._id === id);
      const placeById = planToCheck.places.find(
        (place) => place.googlePlacesId === googleId
      );

      return placeById || null;
    };

    if (placeChecker(googleId, savedPlans) === null) {
      const data = await axios.put(
        `${API_URL}/api/plans/${id}/addPlace`,
        dataToInject,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("injected Data", data);
      setFailPlanSave(false);
      setModalVisibleSave(false);
      setFoodModalVisibleSave(false);
      setActivitiesModalVisibleSave(false);
    } else {
      setFailPlanSave(true);
      showSaveModal();
    }
  };

  const deletePlan = async (event) => {
    event.preventDefault();
    const { id } = event.target;
    console.log(id);
    const data = await axios.delete(`${API_URL}/api/plans/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    showSaveModal();
  };

  return (
    <div style={{ backgroundColor: "white" }}>
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
          marginTop: "-450px",
          marginRight: "200px",
          marginLeft: "200px",
          // backgroundColor: "rgba(250,250,250,.48)",
          position: "relative",
        }}
      >
        <Row
          style={{
            paddingTop: "50px",
            paddingLeft: "50px",
            paddingBottom: "50px",
          }}
        >
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "80%", overflow: "visible" }}>
              <Title
                level={2}
                strong
                style={{
                  color: "white",
                  fontSize: "40px",
                  textShadow: "2px 2px #FF4D4F",
                }}
              >
                Discover what you can do on your next trip
              </Title>
              <Text
                strong
                style={{
                  color: "white",
                  fontSize: "20px",
                  textShadow: "2px 2px #FF4D4F",
                }}
              >
                Find activities and points of interest to inspire an itinerary
                for your next trip
              </Text>
            </div>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              title="Search for a city"
              headStyle={{
                color: "red",
                fontSize: "30px",
                textAlign: "center",
              }}
              bordered={false}
              style={{
                width: 500,
                boxShadow: "0 2px 6px rgba(120,111,120,.48)",
                borderRadius: "20px",
                padding: "20px",
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
                  <Input style={{ borderRadius: "25px", borderColor: "red" }} />
                </Form.Item>
                {requiredSwitch ? (
                  <div style={{ color: "red" }}>Please select one.</div>
                ) : null}
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Food">
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
                <div style={{ display: "inline-block" }}>
                  <Form.Item label="Activities" style={{ marginLeft: "20px" }}>
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
                  <Form.Item label="Nightlife" style={{ marginLeft: "20px" }}>
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

                <Form.Item>
                  <Button
                    shape="round"
                    style={{
                      width: "120px",
                      background:
                        "linear-gradient(135deg, rgb(255,0,0) 0%, rgb(247,205,105) 100%)",
                    }}
                    size="large"
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
            paddingBottom: "100px",
          }}
        >
          {!showResults ? null : (
            <Collapse
              defaultActiveKey={[
                "foodPanel",
                "activitiesPanel",
                "nightlifePanel",
              ]}
              key="collapse table"
              onChange={callback}
              style={{
                marginTop: "20px",
                marginBottom: "50px",
                boxShadow: "0 2px 6px rgba(120,111,120,.48)",
                borderRadius: "20px",
              }}
            >
              <Panel
                header="Food list"
                key="foodPanel"
                style={{ minWidth: "1000px", maxWidth: "1000px" }}
              >
                {loading ? (
                  <div>
                    <Skeleton active avatar />
                    <Skeleton active avatar />
                    <Skeleton active avatar />
                  </div>
                ) : (
                  <List
                    itemLayout="vertical"
                    size="large"
                    key="foodList"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 4,
                    }}
                    dataSource={foodData}
                    renderItem={(item) => (
                      <List.Item
                        key={`food ${item.googlePlacesId}`}
                        actions={[
                          <div>
                            <Button
                              id="foodSaveBtn"
                              type="primary"
                              onClick={showSaveModal}
                              shape="round"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                            >
                              <div
                                className="icons-list"
                                style={{ color: "white" }}
                                id="foodSaveBtn"
                              >
                                <StarOutlined
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                  }}
                                />
                                Save to plan
                              </div>
                            </Button>
                            <Modal
                            id="foodSaveBtn"
                              title="Save To a Plan"
                              visible={foodModalVisibleSave}
                              onOk={handleModalSaveOk}
                              onCancel={handleModalSaveCancel}
                              cancelButtonProps={{ style: { display: "none" } }}
                              okButtonProps={{
                                danger: true,
                                shape: "round",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              style={{ borderRadius: "20px", padding: "15px" }}
                            >
                              <Form
                                name="newPlan"
                                layout="inline"
                                onFinish={saveNewPlan}
                                initialValues={{
                                  PlanName: {
                                    planName: "",
                                  },
                                }}
                              >
                                <Form.Item
                                  name="planName"
                                  label="New Plan: "
                                  rules={[
                                    {
                                      require: true,
                                      message: "please enter a name",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Plan to Crete"
                                    style={{
                                      borderRadius: "25px",
                                      marginBottom: "10px",
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item id="foodSaveBtn">
                                  <Button
                                  id="foodSaveBtn"
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                                    }}
                                    shape="round"
                                  >
                                    Save
                                  </Button>
                                </Form.Item>
                              </Form>
                              {failSave ? (
                                <p style={{ color: "red" }}>
                                  Please enter unique plan name
                                </p>
                              ) : null}
                              {failPlanSave ? (
                                <p style={{ color: "red" }}>
                                  Place already exists in selected plan
                                </p>
                              ) : null}
                              <p>existing plans:</p>
                              {!savedPlans.length ? (
                                <p>
                                  No saved plans yet, please save a new one
                                  above
                                  <PushpinOutlined
                                    style={{ paddingLeft: "10px" }}
                                  />
                                </p>
                              ) : (
                                <div
                                  style={{
                                    height: "300px",
                                    overflow: "scroll",
                                    overflowX: "hidden",
                                  }}
                                >
                                  {savedPlans.map((plan) => {
                                    return (
                                      <p key={`plans food ${plan._id}`}>
                                        <Tag
                                          color="volcano"
                                          style={{
                                            borderRadius: "25px",
                                            fontSize: "15px",
                                            height: "22px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          <a
                                            id={plan._id}
                                            className={item.googlePlacesId}
                                            onClick={saveToPlan}
                                          >
                                            {plan.title}
                                          </a>
                                        </Tag>
                                        <a
                                          id={plan._id}
                                          onClick={deletePlan}
                                          style={{
                                            float: "right",
                                            paddingRight: "50px",
                                          }}
                                        >
                                          <DeleteOutlined
                                            style={{
                                              paddingRight: "10px",
                                              paddingBottom: "5px",
                                            }}
                                          />{" "}
                                          Delete
                                        </a>
                                      </p>
                                    );
                                  })}
                                </div>
                              )}
                            </Modal>
                            {/* <SaveModal modalVisibleSave = {modalVisibleSave}
  handleModalSaveOk = {handleModalSaveOk}
  handleModalSaveCancel = {handleModalSaveCancel}
  saveNewPlan = {saveNewPlan}
  failSave = {failSave}
  failPlanSave = {failPlanSave}
  savedPlans = {savedPlans}
  saveToPlan = {saveToPlan}
  item = {item}
  deletePlan = {deletePlan} /> */}
                          </div>,
                          <div>
                            <Button
                              id="foodButton"
                              type="primary"
                              onClick={showModalViewMore}
                              style={{
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              shape="round"
                            >
                              <div
                                className="icons-list"
                                style={{ color: "white" }}
                                id="foodButton"
                              >
                                <SearchOutlined
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                  }}
                                />
                                View More Info
                              </div>
                            </Button>
                            <Modal
                              title="Latest Reviews"
                              visible={foodModalVisibleViewMore}
                              onOk={handleModalViewMoreOk}
                              onCancel={handleModalViewMoreCancel}
                              cancelButtonProps={{ style: { display: "none" } }}
                              okButtonProps={{
                                danger: true,
                                shape: "round",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              style={{ borderRadius: "20px", padding: "15px" }}
                            >
                              <div
                                style={{
                                  height: "600px",
                                  overflow: "scroll",
                                  overflowX: "hidden",
                                  width: "auto",
                                  paddingRight: "30px",
                                }}
                              >
                                {item.review.map((rev) => (
                                  <Comment
                                    key={`review food ${rev.time}`}
                                    author={rev.author_name}
                                    avatar={
                                      <Avatar
                                        src={rev.profile_photo_url}
                                        alt={rev.author_name}
                                      />
                                    }
                                    content={<p>{rev.text}</p>}
                                    datetime={`${rev.relative_time_description}  Rating: ${rev.rating}/5`}
                                  >
                                    <Divider />
                                  </Comment>
                                ))}
                              </div>
                            </Modal>
                          </div>,
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
                          title={
                            <a
                              href={item.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.name}
                            </a>
                          }
                          description={item.address}
                        />
                        Opening Times:{" "}
                        {item.openingTimes.map((time) => `${time}, `)}
                      </List.Item>
                    )}
                  />
                )}
              </Panel>
              <Panel
                header="Activities list"
                key="activitiesPanel"
                style={{ minWidth: "1000px", maxWidth: "1000px" }}
              >
                {loading ? (
                  <div>
                    <Skeleton active avatar />
                    <Skeleton active avatar />
                    <Skeleton active avatar />
                  </div>
                ) : (
                  <List
                    itemLayout="vertical"
                    size="large"
                    key="activities list"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 4,
                    }}
                    dataSource={activitiesData}
                    renderItem={(item) => (
                      <List.Item
                        key={`activities ${item.googlePlacesId}`}
                        actions={[
                          <div>
                            <Button
                              id="ActivitiesSaveBtn"
                              type="primary"
                              onClick={showSaveModal}
                              shape="round"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                            >
                              <div
                                id="ActivitiesSaveBtn"
                                className="icons-list"
                                style={{ color: "white" }}
                              >
                                <StarOutlined
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                  }}
                                />
                                Save to plan
                              </div>
                            </Button>
                            <Modal
                            id="ActivitiesSaveBtn"
                              title="Save To a Plan 1"
                              visible={activitiesModalVisibleSave}
                              onOk={handleModalSaveOk}
                              onCancel={handleModalSaveCancel}
                              cancelButtonProps={{ style: { display: "none" } }}
                              okButtonProps={{
                                danger: true,
                                shape: "round",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              style={{ borderRadius: "20px", padding: "15px" }}
                            >
                              <Form
                                name="newPlan"
                                layout="inline"
                                onFinish={saveNewPlan}
                                initialValues={{
                                  PlanName: {
                                    planName: "",
                                  },
                                }}
                              >
                                <Form.Item
                                  name="planName"
                                  label="New Plan: "
                                  rules={[
                                    {
                                      require: true,
                                      message: "please enter a name",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Plan to Crete"
                                    style={{
                                      borderRadius: "25px",
                                      marginBottom: "10px",
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item id="ActivitiesSaveBtn">
                                  <Button
                                  id="ActivitiesSaveBtn"
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                                    }}
                                    shape="round"
                                  >
                                    Save
                                  </Button>
                                </Form.Item>
                              </Form>
                              {failSave ? (
                                <p style={{ color: "red" }}>
                                  Please enter unique plan name
                                </p>
                              ) : null}
                              {failPlanSave ? (
                                <p style={{ color: "red" }}>
                                  Place already exists in selected plan
                                </p>
                              ) : null}
                              <p>existing plans:</p>
                              {!savedPlans.length ? (
                                <p>
                                  No saved plans yet, please save a new one
                                  above
                                  <PushpinOutlined
                                    style={{ paddingLeft: "10px" }}
                                  />
                                </p>
                              ) : (
                                <div
                                  style={{
                                    height: "300px",
                                    overflow: "scroll",
                                    overflowX: "hidden",
                                  }}
                                >
                                  {savedPlans.map((plan) => {
                                    return (
                                      <p key={`plan activities ${plan._id}`}>
                                        <Tag
                                          color="volcano"
                                          style={{
                                            borderRadius: "25px",
                                            fontSize: "15px",
                                            height: "22px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          <a
                                            id={plan._id}
                                            className={item.googlePlacesId}
                                            onClick={saveToPlan}
                                          >
                                            {plan.title}
                                          </a>
                                        </Tag>
                                        <a
                                          id={plan._id}
                                          onClick={deletePlan}
                                          style={{
                                            float: "right",
                                            paddingRight: "50px",
                                          }}
                                        >
                                          <DeleteOutlined
                                            style={{
                                              paddingRight: "10px",
                                              paddingBottom: "5px",
                                            }}
                                          />{" "}
                                          Delete
                                        </a>
                                      </p>
                                    );
                                  })}
                                </div>
                              )}
                            </Modal>
                            {/* <SaveModal modalVisibleSave = {modalVisibleSave}
handleModalSaveOk = {handleModalSaveOk}
handleModalSaveCancel = {handleModalSaveCancel}
saveNewPlan = {saveNewPlan}
failSave = {failSave}
failPlanSave = {failPlanSave}
savedPlans = {savedPlans}
saveToPlan = {saveToPlan}
item = {item}
deletePlan = {deletePlan} /> */}
                          </div>,
                          <div>
                            <Button
                              id="activitiesButton"
                              type="primary"
                              onClick={showModalViewMore}
                              style={{
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              shape="round"
                            >
                              <div
                                className="icons-list"
                                style={{ color: "white" }}
                                id="activitiesButton"
                              >
                                <SearchOutlined
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                  }}
                                />
                                View More Info
                              </div>
                            </Button>
                            <Modal
                              title="Latest Reviews"
                              visible={activitiesModalVisibleViewMore}
                              onOk={handleModalViewMoreOk}
                              onCancel={handleModalViewMoreCancel}
                              cancelButtonProps={{ style: { display: "none" } }}
                              okButtonProps={{
                                danger: true,
                                shape: "round",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              style={{ borderRadius: "20px", padding: "15px" }}
                            >
                              <div
                                style={{
                                  height: "600px",
                                  overflow: "scroll",
                                  overflowX: "hidden",
                                  width: "auto",
                                  paddingRight: "30px",
                                }}
                              >
                                {item.review.map((rev) => (
                                  <Comment
                                    key={`activities review ${rev.time}`}
                                    author={rev.author_name}
                                    avatar={
                                      <Avatar
                                        src={rev.profile_photo_url}
                                        alt={rev.author_name}
                                      />
                                    }
                                    content={<p>{rev.text}</p>}
                                    datetime={`${rev.relative_time_description}  Rating: ${rev.rating}/5`}
                                  >
                                    <Divider />
                                  </Comment>
                                ))}
                              </div>
                            </Modal>
                          </div>,
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
                          title={
                            <a
                              href={item.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.name}
                            </a>
                          }
                          description={item.address}
                        />
                        Opening Times:{" "}
                        {item.openingTimes.map((time) => `${time}, `)}
                      </List.Item>
                    )}
                  />
                )}
              </Panel>
              <Panel
                header="Nightlife list"
                key="nightlifePanel"
                style={{ minWidth: "1000px", maxWidth: "1000px" }}
              >
                {loading ? (
                  <div>
                    <Skeleton active avatar />
                    <Skeleton active avatar />
                    <Skeleton active avatar />
                  </div>
                ) : (
                  <List
                    itemLayout="vertical"
                    size="large"
                    key="nightlife list"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 4,
                    }}
                    dataSource={nightlifeData}
                    renderItem={(item) => (
                      <List.Item
                        key={`nightlife ${item.googleId}`}
                        actions={[
                          <div>
                            <Button
                              type="primary"
                              onClick={showSaveModal}
                              shape="round"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                            >
                              <div
                                className="icons-list"
                                style={{ color: "white" }}
                              >
                                <StarOutlined
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                  }}
                                />
                                Save to plan
                              </div>
                            </Button>
                            <Modal
                              title="Save To a Plan"
                              visible={modalVisibleSave}
                              onOk={handleModalSaveOk}
                              onCancel={handleModalSaveCancel}
                              cancelButtonProps={{ style: { display: "none" } }}
                              okButtonProps={{
                                danger: true,
                                shape: "round",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              style={{ borderRadius: "20px", padding: "15px" }}
                            >
                              <Form
                                name="newPlan"
                                layout="inline"
                                onFinish={saveNewPlan}
                                initialValues={{
                                  PlanName: {
                                    planName: "",
                                  },
                                }}
                              >
                                <Form.Item
                                  name="planName"
                                  label="New Plan: "
                                  rules={[
                                    {
                                      require: true,
                                      message: "please enter a name",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Plan to Crete"
                                    style={{
                                      borderRadius: "25px",
                                      marginBottom: "10px",
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                                    }}
                                    shape="round"
                                  >
                                    Save
                                  </Button>
                                </Form.Item>
                              </Form>
                              {failSave ? (
                                <p style={{ color: "red" }}>
                                  Please enter unique plan name
                                </p>
                              ) : null}
                              {failPlanSave ? (
                                <p style={{ color: "red" }}>
                                  Place already exists in selected plan
                                </p>
                              ) : null}
                              <p>existing plans:</p>
                              {!savedPlans.length ? (
                                <p>
                                  No saved plans yet, please save a new one
                                  above
                                  <PushpinOutlined
                                    style={{ paddingLeft: "10px" }}
                                  />
                                </p>
                              ) : (
                                <div
                                  style={{
                                    height: "300px",
                                    overflow: "scroll",
                                    overflowX: "hidden",
                                  }}
                                >
                                  {savedPlans.map((plan) => {
                                    return (
                                      <p key={`plan nightlife ${plan._id}`}>
                                        <Tag
                                          color="volcano"
                                          style={{
                                            borderRadius: "25px",
                                            fontSize: "15px",
                                            height: "22px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          <a
                                            id={plan._id}
                                            className={item.googlePlacesId}
                                            onClick={saveToPlan}
                                          >
                                            {plan.title}
                                          </a>
                                        </Tag>
                                        <a
                                          id={plan._id}
                                          onClick={deletePlan}
                                          style={{
                                            float: "right",
                                            paddingRight: "50px",
                                          }}
                                        >
                                          <DeleteOutlined
                                            style={{
                                              paddingRight: "10px",
                                              paddingBottom: "5px",
                                            }}
                                          />{" "}
                                          Delete
                                        </a>
                                      </p>
                                    );
                                  })}
                                </div>
                              )}
                            </Modal>
                            {/* <SaveModal modalVisibleSave = {modalVisibleSave}
  handleModalSaveOk = {handleModalSaveOk}
  handleModalSaveCancel = {handleModalSaveCancel}
  saveNewPlan = {saveNewPlan}
  failSave = {failSave}
  failPlanSave = {failPlanSave}
  savedPlans = {savedPlans}
  saveToPlan = {saveToPlan}
  item = {item}
  deletePlan = {deletePlan} /> */}
                          </div>,
                          <div>
                            <Button
                              type="primary"
                              onClick={showModalViewMore}
                              style={{
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              shape="round"
                            >
                              <div
                                className="icons-list"
                                style={{ color: "white" }}
                              >
                                <SearchOutlined
                                  style={{
                                    display: "inline-block",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                  }}
                                />
                                View More Info
                              </div>
                            </Button>
                            <Modal
                              title="Latest Reviews"
                              visible={modalVisibleViewMore}
                              onOk={handleModalViewMoreOk}
                              onCancel={handleModalViewMoreCancel}
                              cancelButtonProps={{ style: { display: "none" } }}
                              okButtonProps={{
                                danger: true,
                                shape: "round",
                                background:
                                  "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(247,205,105) 100%)",
                              }}
                              style={{ borderRadius: "20px", padding: "15px" }}
                            >
                              <div
                                style={{
                                  height: "600px",
                                  overflow: "scroll",
                                  overflowX: "hidden",
                                  width: "auto",
                                  paddingRight: "30px",
                                }}
                              >
                                {item.review.map((rev) => (
                                  <Comment
                                    key={`review nightlife ${rev.time}`}
                                    author={rev.author_name}
                                    avatar={
                                      <Avatar
                                        src={rev.profile_photo_url}
                                        alt={rev.author_name}
                                      />
                                    }
                                    content={<p>{rev.text}</p>}
                                    datetime={`${rev.relative_time_description}  Rating: ${rev.rating}/5`}
                                  >
                                    <Divider />
                                  </Comment>
                                ))}
                              </div>
                            </Modal>
                          </div>,
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
                          title={
                            <a
                              href={item.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.name}
                            </a>
                          }
                          description={item.address}
                        />
                        Opening Times:{" "}
                        {item.openingTimes.map((time) => `${time}, `)}
                      </List.Item>
                    )}
                  />
                )}
              </Panel>
              {/* <Panel header="Activities List" key="2">
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
            </Panel> */}
            </Collapse>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
