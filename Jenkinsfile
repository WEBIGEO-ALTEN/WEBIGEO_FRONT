pipeline{
    agent any
    environment{
        DOCKER_IMAGE="my_react"
        DOCKER_TAG="front_test"
        DOCKER_FRONT="Front_Container"
    }
    stages{
        stage("Front End image"){
            steps{
                sh """
                docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f Dockerfile . --no-cache
                """
            }

        }
        
        stage("Dcoker run the image"){
            steps{
                sh"""
                docker run -d -p 3020:3000 --name $DOCKER_FRONT $DOCKER_IMAGE:$DOCKER_TAG
                """
            }
        }

        stage("Testing the containers") {
            steps {
                script {
                    echo "curl -i http://localhost:3020"
                    def url = "http://localhost:3020"
            
                    def response = sh(script: "curl -i $url", returnStatus: true)
            
                    if (response == 0) {
                        error "HTTP request to $url failed, check the URL and try again."
                    } else {
                        def statusCode = sh(script: "curl -s -o /dev/null -w '%{http_code}' $url", returnStatus: true).trim()
                
                        if (statusCode.startsWith("2")) {
                            echo "HTTP request to $url was successful. Status code: $statusCode"
                        } else {
                            error "HTTP request to $url failed with status code $statusCode"
                        }
                     }
                }
            }
        }

        stage("Removing the container and Image"){
            steps{            
                sh"""
                docker stop $DOCKER_FRONT
                docker rm $DOCKER_FRONT
                docker rmi $DOCKER_IMAGE:$DOCKER_TAG
                """ 
            }
        }

        stage("Invoking another pipeline"){
            steps{
                echo "printenv"
                build job: 'WEBIGEO',parameters:[string(name:'param1',value:"value1")],wait: true
            }
        }

        stage("End"){
            steps{
                echo "Bye"
            }
        }
    }
}