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
                docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f Dockerfile --no-cahe
                """
            }

        }
        
        stage("Dcoker run the image"){
            steps{
                sh"""
                docker run -d --name -p 3020:3000 $DOCKER_FRONT $DOCKER_IMAGE:$DOCKER_TAG
                """
            }
        }

        stage("Testing the containers"){
            steps{
                sh """
                docker exec -it $DOCKER_FRONT sh
                
                """
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