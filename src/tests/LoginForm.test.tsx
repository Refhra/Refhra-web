import { describe,  test,} from "vitest";
import { render} from "@testing-library/react";
import LoginForm from "@/components/forms/LoginForm";


describe('<LoginForm/>', () => (
    test('renders LoginForm component', () => {
        render (<LoginForm/>)
    }  )
) )