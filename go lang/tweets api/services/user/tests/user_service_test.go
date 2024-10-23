package tests

import (
	"testing"
	"tweet/database/types"
	"tweet/repository/user/mocks"
	"tweet/services/user"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type UserServiceCaseSuit struct {
	suite.Suite
	UserRepo    *mocks.UserRepoInterface
	Userservice user.UserService
	Hasher      *MockHash
}

type MockHash struct {
	mock.Mock
}

func (m *MockHash) HashMyPassword(h []byte) (string, error) {
	args := m.Called(h)
	return args.String(0), args.Error(1)
}

func (suite *UserServiceCaseSuit) SetupSuite() {
	repo := new(mocks.UserRepoInterface)
	userservice := user.NewUserService(repo)

	suite.UserRepo = repo
	suite.Userservice = *userservice
}

func (suite *UserServiceCaseSuit) TestUserRegister() {

	h, herr := user.HashMyPassword([]byte("test01"))
	if herr != nil {
		suite.Error(herr, "error in hashing the password")
	}

	suite.Hasher = new(MockHash)
	userPayload := types.UserCreate{
		Username: "test01",
		Password: "test01",
		Email:    "test01@mail.com",
	}

	suite.UserRepo.On("Create", userPayload.Username, userPayload.Password, userPayload.Email).Return(nil)
	suite.Hasher.On("HashMyPassword", []byte("test01")).Return(h, nil)

	err := suite.Userservice.RegisterUser(&userPayload)
	suite.Nil(err, "not error on registering user")

	suite.UserRepo.AssertExpectations(suite.T())
}

func TestUserService(t *testing.T) {
	suite.Run(t, new(UserServiceCaseSuit))
}
