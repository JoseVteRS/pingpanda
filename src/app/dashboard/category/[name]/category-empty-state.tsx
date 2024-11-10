import { Card } from "@/app/components/ui/card"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export const EmptyCategoryState = ({
  categoryName,
}: {
  categoryName: string
}) => {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      const res = await client.category.pollCategory.$get({
        name: categoryName,
      })
      return await res.json()
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000
    },
  })

  const hasEvents = data?.hasEvents

  useEffect(() => {
    if (hasEvents) {
      router.refresh()
    }
  }, [hasEvents, router])

  const codeSnippet = `await fetch('http://localhost:3000/api/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`

  return (
    <Card
      contentClassName="max-w-2xl w-full flex flex-col items-center p-6"
      className="flex-1 flex items-center justify-center"
    >
      <h2 className="text-xl/8 font-medium text-center tracking-tight">
        Create your first {categoryName} event
      </h2>
      <p className="text-sm/6 text-grat-600 mb-8 max-w-md text-center text-pretty">
        Get started by sending a request to our tracking API:
      </p>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-4 p-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="size-3 rounded-full bg-red-500"></div>
            <div className="size-3 rounded-full bg-yellow-500"></div>
            <div className="size-3 rounded-full bg-green-500"></div>
          </div>

          <span className="text-gray-400 text-sm">your-first-event.js</span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{
            borderRadius: "0px",
            margin: "0px",
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="mt-8 flex flex-col items-center space-x-2">
        <div className="flex items-center gap-2">
          <div className="size-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">
            Listening incoming events...
          </span>
        </div>
        <p className="text-sm/6 text-gray-600 mt-2">
          Need help? Check out our&nbsp;
          <a href="#" className="text-blue-600 hover:underline">
            documentation&nbsp;
          </a>
          &nbsp;or&nbsp;
          <a href="#" className="text-blue-600 hover:underline">
            contact support
          </a>
        </p>
      </div>
    </Card>
  )
}
