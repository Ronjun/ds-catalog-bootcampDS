import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "..";
import { Router } from "react-router-dom";
import history from "core/utils/history";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { productsResponse } from "./fixtures";

const server = setupServer(
  rest.get('http://localhost:8080/products',(req, res, ctx) => {
    return res(ctx.json(productsResponse))
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should render catalog", async () => {
  render(
    <Router history={history}>
      <Catalog />
    </Router>
  );

  expect(screen.getAllByTitle("Loading...")).toHaveLength(12);
  expect(screen.getByText("Catálogo de produtos")).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByText("Macbook Pro")).toBeInTheDocument()
  );
  expect(screen.queryAllByTitle('Loading...')).toHaveLength(0);
  expect(screen.getByText("Notebook BERONS")).toBeInTheDocument();
  //screen.debug();
});
