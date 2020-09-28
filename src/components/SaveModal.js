import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Tag } from "antd";
import {
  CloseOutlined,
  PushpinOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import UserContext from "../context/UserContext";

const SaveModal = (
  deletePlan,
  item,
  modalVisibleSave,
  handleModalSaveOk,
  handleModalSaveCancel,
  saveNewPlan,
  failSave,
  failPlanSave,
  savedPlans,
  saveToPlan
) => {
  return (
    <Modal
      title="Save To a Plan"
      visible={modalVisibleSave}
      onOk={handleModalSaveOk}
      onCancel={handleModalSaveCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ danger: true, shape: "round" }}
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
          <Button type="primary" htmlType="submit" danger shape="round">
            Save
          </Button>
        </Form.Item>
      </Form>
      {failSave ? (
        <p style={{ color: "red" }}>Please enter unique plan name</p>
      ) : null}
      {failPlanSave ? (
        <p style={{ color: "red" }}>Place already exists in selected plan</p>
      ) : null}
      <p>existing plans:</p>
      {!savedPlans.length ? (
        <p>
          No saved plans yet, please save a new one above
          <PushpinOutlined style={{ paddingLeft: "10px" }} />
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
              <p>
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
  );
};

export default SaveModal;
