import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import moment from "moment"
import React, { useState } from "react"
import { CSVLink } from "react-csv"


const App = () => {

  const [form] = useForm()

  const [data,setData] = useState([])
  const [open,setOpen] = useState(false)

  const handleClose = ()=>{

    form.resetFields()
    setOpen(false)


  }


const createRecord = (values) =>{

  values.date = moment(values.date).toDate()
  setData([
    ...data,
    values
  ])
handleClose()

}

const download = ()=>{

}

  return(

    <div className="min-h-screen bg-gray-200 space-y-8 py-12">
      <h1 className="text-4xl font-bold text-center">CSV Example</h1>
      <div className="bg-white rounded-lg p-4 w-9/12 mx-auto flex items-center gap-5">
         <button className="bg-indigo-600 text-white font-medium px-12 py-3 rounded" onClick={()=>setOpen(true)}>New Record</button>
         <CSVLink data={data}>
             <button className="bg-cyan-600 text-white font-medium px-12 py-3 rounded" >Export to CSV</button>
          </CSVLink>
      </div>
       <div className="bg-white rounded-lg p-4 w-9/12 mx-auto">
        <table className="w-full">
          <thead>
          <tr className="text-left bg-rose-500 text-white">
            <th className="pl-4 py-3">Coustomer's Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
         {
          data.map((item,index)=>(
             <tr className="text-left bg-white border-b border-b-gray-200 text-black/60" key={index}>
             <td className="pl-4 py-3">{item.customerName}</td>
             <td>{item.customerMobile}</td>
             <td>{item.customerEmail}</td>
             <td>{item.product}</td>
             <td>{item.amount}</td>
             <td>{item.status}</td>
             <td>{moment(item.date).format('MMM DD YYYY, hh:mm A')}</td>
          </tr>
          ))
         }
          </tbody>
        </table>
    
      </div>
      <Modal open={open} footer={null} onCancel={handleClose}>
        <Form form={form} layout="vertical" onFinish={createRecord}>
          <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[{required:true}]}
          >
            <Input size="large" placeholder="Enter Customer Name"/>
          </Form.Item>
          <Form.Item
          label="Mobile"
          name="customerMobile"
          rules={[{required:true}]}
          >
            <Input size="large" placeholder="Enter Mobile No"/>
          </Form.Item>
          <Form.Item
          label="Email"
          name="customerEmail"
          rules={[{required:true,type:'email'}]}
          >
            <Input size="large" placeholder="example@email.com"/>
          </Form.Item>
          
          <Form.Item
          label="Product"
          name="product"
          rules={[{required:true}]}
          >
            <Input size="large" placeholder="Enter Product Name"/>
          </Form.Item>
          <Form.Item
          label="Amount"
          name="amount"
          rules={[{required:true,type:'number'}]}
          >
            <InputNumber size="large" placeholder="Enter Product Name" className="!w-full"/>
          </Form.Item>
          <Form.Item
          label="Status"
          name="status"
          rules={[{required:true}]}
          >
            <Select size="large" placeholder="Choose Status">
              <Select.Option value="cold">Cold</Select.Option>
              <Select.Option value="hot">Hot</Select.Option>
              <Select.Option value="closed">Closed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
          label="Date"
          name="date"
          rules={[{required:true}]}
          >
            <DatePicker size="large" className="!w-full"></DatePicker>
            
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )

}

export default App