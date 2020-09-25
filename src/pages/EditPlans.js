import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import mountain from "../assets/mountains.jpg";
import {
  Col,
  Row,
  Card,
  Collapse,
  List,
  Avatar,
  Space,
  Modal,
  Divider,
  Button,
  Spin,
  Tag,
  Skeleton,
  Select,
} from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const API_URL = process.env.API_URL || "http://localhost:8001";

const EditPlans = () => {
  const { user } = useContext(UserContext);
  const [savedPlans, setSavedPlans] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await axios.get(`${API_URL}/api/plans`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSavedPlans(data.allPlans);
    };
    fetchPlans();
  }, [setSavedPlans, user.token]);

  const deletePlan = async (event) => {
    console.log(event);
    const id = event._id;
    await axios.delete(`${API_URL}/api/plans/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const { data } = await axios.get(`${API_URL}/api/plans`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setSavedPlans(data.allPlans);
  };

  const deletePlace = (event) => {
      
      const id = event.target.id
      const foundPlan = savedPlans.find((plans) => plans.places._id === id);
      console.log("click", foundPlan )
  }

  const { Panel } = Collapse;
  const { Option } = Select;

  const genExtra = (plan) => (
    <DeleteOutlined
      id={plan}
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();

        deletePlan(plan);
      }}
    />
  );

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 150, margin: "0 auto" }} spin />
  );

  return (
    <div
      style={{
        minHeight: "93.5vh",
        backgroundImage: `url(${mountain})`,
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container" style={{ paddingTop: "50px" }}>
        <div
          style={{
            borderRadius: "25px",
            padding: "25px",
            color: "red",
            boxShadow: "0 2px 6px rgba(120,111,120,.48)",
            backgroundColor: "rgba(250,250,250,.85)",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th scope="col" style={{ fontSize: "25px" }}>
                  Plans
                </th>
              </tr>
            </thead>

            <Divider
              style={{ borderColor: "white", backgroundColor: "white" }}
            />
          </table>
          {!savedPlans ? (
            <Spin
              indicator={antIcon}
              style={{ display: "flex", justifyContent: "center" }}
            />
          ) : (
            <Collapse
              onChange={console.log("change")}
              style={{
                borderRadius: "25px",
                boxShadow: "0 2px 6px rgba(120,111,120,.48)",
              }}
            >
              {savedPlans.map((plan) => {
                console.log(plan._id);
                return (
                  <Panel
                    header={plan.title}
                    key={plan._id}
                    id={plan._id}
                    extra={genExtra(plan)}
                  ><Row gutter={16}>
                    {plan.places.map((place) => {
                      return (
                        <Col span={8}><Card
                          hoverable
                          style={{ width: 300, textAlign: "center" }}
                          key={place._id}
                          cover={
                            <img
                              alt="example"
                              src={place.photo}
                              style={{
                                height: "200px",
                                width: "300px",
                                marginRight: "20px",
                                marginBottom: "20px",
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              }}
                            />
                          }
                        >
                          <Meta
                            title={place.name}
                            description={
                                <div>
                              <a
                              href={place.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            ><Button
                                shape="round"
                                style={{
                                  width: "100px",
                                  background:
                                    "linear-gradient(135deg, rgb(247,205,105) 0%, rgb(255,0,0) 100%)",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginRight: "20px"
                                }}
                                size="large"
                                type="primary"
                                htmlType="submit"
                              >
                                View Site
                              </Button>
                              </a>
                              <Button
                              shape="round"
                              style={{
                                width: "100px",
                                background:
                                  "linear-gradient(135deg, rgb(255,0,0) 0%, rgb(247,205,105) 100%)",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              size="large"
                              type="primary"
                              htmlType="submit"
                              id={place._id}
                              onClick={deletePlace}
                            >
                              Remove
                            </Button>
                            </div>
                            }
                            headStyle={{
                              textWrap: "break-word",
                              display: "inline-block",
                            }}
                          />
                        </Card>
                        </Col>
                      );
                    })}
                    </Row>
                  </Panel>
                );
              })}
              <Panel header="This is panel header 1" key="1" extra={genExtra()}>
                <div>gigigigi</div>
              </Panel>
            </Collapse>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditPlans;
