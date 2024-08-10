package model

type Role int

const (
	Admin Role = iota + 1
	Author
)

func (r Role) String() string {
	switch r {
	case Admin:
		return "Admin"
	case Author:
		return "Author"
	default:
		return "Author"
	}
}

func (r Role) Value() int {
	return int(r)
}
