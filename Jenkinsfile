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

        stage("Testing the containers"){
            steps{
                //docker exec -it $DOCKER_FRONT sh
                //curl -X GET -i https://localhost:3020
                script {
                    def url = "http://localhost:3020/"
            
                    def response = sh(script: "curl -s $url", returnStatus: true)
            
                    if (response == 0) {
                        echo "HTTP request to $url was successful"
                    } else {
                        error "HTTP request to $url failed with status code $response"
                    }
                }  
            }
        }

        stage("Removing the container and Image"){
            steps{            
                sh"""
                docker rm $DOCKER_FRONT
                docker rmi $DOCKER_IMAGE:$DOCKER_TAG
                """ 
            }
        }

        stage("Invoking another pipeline"){
            steps{
                echo "printenv"
                //build job: 'WEBIGEO',parameters:[string(name:'param1',value:"value1")],wait: true
            }
        }

        stage("End"){
            steps{
                echo "Bye"
            }
        }
    }
}