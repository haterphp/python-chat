from typing import List
from fastapi import Request
from fastapi.responses import JSONResponse


class IRouteAction():

	def router_path(self) -> List[str]:
		raise NotImplementedError('Method "route_path" must be Implemented')

	def action(self, request: Request) -> JSONResponse:
		raise NotImplementedError('Method "action" must be Implemented')