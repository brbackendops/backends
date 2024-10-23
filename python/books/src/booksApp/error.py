from fastapi import HTTPException


class Error(HTTPException):
    def __init__(self, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)

    def to_dict(self):
        return {"status": "error", "error": self.detail}
