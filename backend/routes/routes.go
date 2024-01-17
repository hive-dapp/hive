package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routes() {
	rout := gin.Default()
	rout.Use(corsMiddleware())
	gin.SetMode(gin.ReleaseMode)
	ApplyRoutes(rout)
	rout.Run(":9090")
}

// corsMiddleware
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "PATCH, POST, GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Length, Accept, Content-Type")
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

func ApplyRoutes(w *gin.Engine) {
	v1 := w.Group("v1/")
	Insta(v1)

}

func Insta(insta *gin.RouterGroup) {

	insta.GET("/test")
}
