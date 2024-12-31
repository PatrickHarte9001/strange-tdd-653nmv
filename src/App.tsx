import { QueryClient, QueryClientProvider } from "react-query";
import FormWrapper from "./components/FormWrapper";
import "./input.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FormWrapper />
    </QueryClientProvider>
  );
}
