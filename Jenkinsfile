pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "my_react"
        DOCKER_TAG = "front_test"
        DOCKER_FRONT = "Front_Container"
    }
    stages {
        stage("Front End image") {
            steps {
                script {
                    sh "docker stop $DOCKER_FRONT"
                    sh "docker rm $DOCKER_FRONT"
                    echo "Building Docker image: $DOCKER_IMAGE:$DOCKER_TAG"
                    //sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f Dockerfile . --no-cache"
                }
            }
        }

        stage("Docker run the image") {
            steps {
                script {
                    echo "Running Docker container: $DOCKER_FRONT"
                    sh "docker run -d -p 3020:3000 --name $DOCKER_FRONT $DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker ps"
                }
            }
        }

        
        stage("Testing the containers") {
            steps {
                script {
                    def containerId = sh(script: "docker ps -qf name=$DOCKER_FRONT", returnStdout: true).trim()

                    if (containerId.empty) {
                        error "Docker container $DOCKER_FRONT not found or not running."
                    }

                    def ipAddress = sh(script: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $containerId", returnStdout: true).trim()

                    def url = "http://${ipAddress}:3020/home"

                    echo "Testing application at $url"
                    
                    // Use 'timeout' to prevent 'curl' from running indefinitely
                    def response = sh(script: "timeout 30 curl -i $url", returnStatus: true)

                    if (response != 0) {
                        error "HTTP request to $url failed, check the URL and try again."
                    } else {
                        def statusCode = sh(script: "curl -s -o /dev/null -w '%{http_code}' $url", returnStatus: true)

                        if (statusCode.startsWith("2")) {
                            echo "HTTP request to $url was successful. Status code: $statusCode"
                        } else {
                            error "HTTP request to $url failed with status code $statusCode"
                        }
                    }
                }
            }
        }
        

        stage("Removing the container and Image") {
            steps {
                script {
                    echo "Stopping and removing Docker container: $DOCKER_FRONT"
                    sh "docker stop $DOCKER_FRONT"
                    sh "docker rm $DOCKER_FRONT"
                    echo "Removing Docker image: $DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker rmi $DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }

        stage("Invoking another pipeline") {
            steps {
                echo "Triggering another pipeline job"
                build job: 'WEBIGEO', parameters: [string(name: 'param1', value: "value1")], wait: true
            }
        }

        stage("End") {
            steps {
                echo "Bye"
            }
        }
    }
}
