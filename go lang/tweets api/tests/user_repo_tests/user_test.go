package user_repo_tests

import (
	"fmt"
	"testing"
	"tweet/database"
	"tweet/repository/user"

	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/suite"
)

type TruncateTableExecutor struct {
	Db *sqlx.DB
}

func NewTruncateTableExecutor(db *sqlx.DB) *TruncateTableExecutor {
	return &TruncateTableExecutor{
		Db: db,
	}
}

func (t *TruncateTableExecutor) Truncate(tabelName string) {
	query := fmt.Sprintf("TRUNCATE TABLE %s RESTART IDENTITY CASCADE", tabelName)
	tx := t.Db.MustBegin()
	_, err := t.Db.Exec(query)
	if err != nil {
		panic(err)
	}
	tx.Commit()
}

type UserTestRepoSuite struct {
	suite.Suite
	Repository user.UserRepo
	Cleanup    TruncateTableExecutor
}

func (suite *UserTestRepoSuite) SetupSuite() {
	db := database.ConnectDb()
	repo := user.NewUserRepo(db)

	suite.Repository = *repo
	suite.Cleanup = *NewTruncateTableExecutor(db)

}

func (suite *UserTestRepoSuite) TestCreateUser() {
	err := suite.Repository.Create("test1", "test1", "test1@mail.com")
	if err != nil {
		suite.Error(err, "error while creating a new user")
	}
	suite.NoError(err, "no error when creating a new user")
}

func (suite *UserTestRepoSuite) TestGetByEmail() {
	u, err := suite.Repository.GetByEmail("test1@mail.com")
	fmt.Println(u)
	if err != nil {
		suite.Error(err, "error while retrieving user with email")
	}
	suite.NoError(err, "no error while retrieving user with email")
}

func (suite *UserTestRepoSuite) TearDownSuite() {
	suite.Cleanup.Truncate("users")
}

func TestUserRepository(t *testing.T) {
	suite.Run(t, new(UserTestRepoSuite))
}
