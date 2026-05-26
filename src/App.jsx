import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/Toaster"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { AuthProvider } from "@/context/auth"

import Home from "@/pages/home"
import NewPost from "@/pages/new-post"
import PostDetail from "@/pages/post-detail"
import Login from "@/pages/login"
import Signup from "@/pages/signup"
import NotFound from "@/pages/not-found"

const queryClient = new QueryClient()

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/new" component={NewPost} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
