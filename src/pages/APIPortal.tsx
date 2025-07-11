
import { useState } from "react";
import { Code, Database, Zap, Globe, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const APIPortal = () => {
  const [selectedAPI, setSelectedAPI] = useState("administrative");

  const apis = [
    {
      id: "administrative",
      name: "API Đơn vị Hành chính",
      description: "Tra cứu và chuyển đổi thông tin đơn vị hành chính Việt Nam",
      endpoint: "/api/administrative",
      status: "active",
      requests: "10,000+",
      icon: Database,
      color: "bg-blue-500"
    },
    {
      id: "postal",
      name: "API Mã Bưu điện",
      description: "Tra cứu mã bưu điện theo địa chỉ",
      endpoint: "/api/postal",
      status: "coming-soon",
      requests: "0",
      icon: Globe,
      color: "bg-green-500"
    },
    {
      id: "banking",
      name: "API Ngân hàng",
      description: "Thông tin chi nhánh ngân hàng và ATM",
      endpoint: "/api/banking",
      status: "coming-soon",
      requests: "0",
      icon: Shield,
      color: "bg-purple-500"
    }
  ];

  const codeExamples = {
    curl: `curl -X GET "https://openapi.devhub.io.vn/api/administrative/search?q=Hà Nội" \\
  -H "Content-Type: application/json"`,
    javascript: `fetch('https://openapi.devhub.io.vn/api/administrative/search?q=Hà Nội')
  .then(response => response.json())
  .then(data => console.log(data));`,
    python: `import requests

response = requests.get('https://openapi.devhub.io.vn/api/administrative/search?q=Hà Nội')
data = response.json()
print(data)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Code className="h-8 w-8 text-white" />
                </div>
                OpenAPI DevHub
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Nền tảng API miễn phí cho developers Việt Nam
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 border-green-300 text-sm px-3 py-1">
                🚀 100% Miễn phí
              </Badge>
              <p className="text-sm text-gray-500 mt-1">openapi.devhub.io.vn</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Tổng API</p>
                  <p className="text-2xl font-bold">3+</p>
                </div>
                <Database className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Requests/Tháng</p>
                  <p className="text-2xl font-bold">10K+</p>
                </div>
                <Zap className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Developers</p>
                  <p className="text-2xl font-bold">500+</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Uptime</p>
                  <p className="text-2xl font-bold">99.9%</p>
                </div>
                <Shield className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📡 Danh sách API</h2>
            {apis.map((api) => {
              const IconComponent = api.icon;
              return (
                <Card 
                  key={api.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                    selectedAPI === api.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAPI(api.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 ${api.color} rounded-lg`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{api.name}</h3>
                          <Badge 
                            variant={api.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {api.status === 'active' ? 'Hoạt động' : 'Sắp ra mắt'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{api.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{api.endpoint}</span>
                          <span>{api.requests} requests</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* API Documentation */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Tài liệu API
                </CardTitle>
                <CardDescription>
                  Hướng dẫn sử dụng và ví dụ code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAPI === 'administrative' && (
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="flex gap-3">
                      <Link to="/administrative">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          🔍 Thử ngay
                        </Button>
                      </Link>
                      <Link to="/conversion">
                        <Button variant="outline">
                          🔄 Công cụ chuyển đổi
                        </Button>
                      </Link>
                    </div>

                    {/* API Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Endpoint chính:</h4>
                      <code className="bg-white px-3 py-1 rounded border">
                        GET https://openapi.devhub.io.vn/api/administrative/search
                      </code>
                    </div>

                    {/* Parameters */}
                    <div>
                      <h4 className="font-semibold mb-3">Tham số:</h4>
                      <div className="space-y-2">
                        <div className="flex gap-4 text-sm">
                          <code className="bg-blue-100 px-2 py-1 rounded font-mono">q</code>
                          <span className="text-gray-600">Từ khóa tìm kiếm</span>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <code className="bg-blue-100 px-2 py-1 rounded font-mono">province</code>
                          <span className="text-gray-600">Tên tỉnh/thành phố</span>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <code className="bg-blue-100 px-2 py-1 rounded font-mono">district</code>
                          <span className="text-gray-600">Tên quận/huyện</span>
                        </div>
                      </div>
                    </div>

                    {/* Code Examples */}
                    <div>
                      <h4 className="font-semibold mb-3">Ví dụ code:</h4>
                      <Tabs defaultValue="curl" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                        </TabsList>
                        <TabsContent value="curl">
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{codeExamples.curl}</code>
                          </pre>
                        </TabsContent>
                        <TabsContent value="javascript">
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{codeExamples.javascript}</code>
                          </pre>
                        </TabsContent>
                        <TabsContent value="python">
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{codeExamples.python}</code>
                          </pre>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}

                {selectedAPI !== 'administrative' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold mb-2">API đang phát triển</h3>
                    <p className="text-gray-600 mb-4">API này sẽ sớm ra mắt với nhiều tính năng hữu ích.</p>
                    <Badge variant="secondary">Sắp ra mắt</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIPortal;
