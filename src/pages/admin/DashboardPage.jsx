import { Card, Col, Row } from "antd";
import UseWebSocket from "../../helper/UseWebSocket";

const DashboardPage = () => {
  const url = "wss://crm.turulabs.com/ws/v1/uptime";
  const { data, error, isOpen } = UseWebSocket(url);

  return (
    <>
      <div className="absolute top-0 mt-24 ml-8">
        <h1 className="text-4xl mb-8 font-bold">Dashboard</h1>
        <pre className="mb-8">
          Status: {isOpen ? "Connected" : "Disconnected"}
          {error && <div>Error: {error.message}</div>}
        </pre>

        <h3 className="text-2xl font-semibold mb-4">Panel Status</h3>
        <Row gutter={16} className="mb-4">
          <Col span={6}>
            <Card
              title="All Time"
              bordered={false}
              size="small"
              className="text-2xl overflow-auto">
              {data && data.api_hit.all_time !== undefined ? (
                <p>{data.api_hit.all_time}</p>
              ) : (
                <p>...</p>
              )}
            </Card>
          </Col>

          <Col span={6}>
            <Card
              title="Since Start"
              bordered={false}
              size="small"
              className="text-2xl overflow-auto">
              {data && data.api_hit.since_start !== undefined ? (
                <p>{data.api_hit.since_start}</p>
              ) : (
                <p>...</p>
              )}
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Memory Usage"
              bordered={false}
              size="small"
              className="text-2xl overflow-auto">
              {data && data.memory_usage !== undefined ? (
                <p>{data.memory_usage}</p>
              ) : (
                <p>...</p>
              )}
            </Card>
          </Col>

          <Col span={10}>
            <Card
              title="Client Ip"
              bordered={false}
              size="small"
              className="text-2xl overflow-auto">
              {data && data.client_ip !== undefined ? (
                <p>{data.client_ip}</p>
              ) : (
                <p>...</p>
              )}
            </Card>
          </Col>

          <Col span={16} className="mt-4">
            <Card
              title="Uptime"
              bordered={false}
              size="small"
              className="text-2xl overflow-auto">
              {data && data.uptime !== undefined ? (
                <p>{data.uptime}</p>
              ) : (
                <p>...</p>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardPage;
